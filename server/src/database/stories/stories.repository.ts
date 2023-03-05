import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoryModel, StoryStatus } from '../../stories/models/story.model';
import { ReplaySubject } from 'rxjs';
import { StatsMessage } from '../../stories/dtos/stats.message';

@Injectable()
export class StoriesRepository {
  private _storiesSubject: ReplaySubject<StatsMessage> =
    new ReplaySubject<StatsMessage>(1);
  public storiesUpdates = this._storiesSubject.asObservable();

  constructor(
    @InjectModel('Stories') private readonly storyModel: Model<StoryModel>,
  ) {

    setInterval(() => {
      // Although it would be preferable to use collection watch in this scenario, it is only supported for mongo replicas.
      // Considering the scope of this assignment, I believe the current approach is appropriate.
      this._setStats();
    }, 2000);
  }

  async create(story: StoryModel): Promise<StoryModel> {
    const storyEntity = new this.storyModel(story);
    const record = await storyEntity.save();
    return new StoryModel().parseDocument(record.toJSON());
  }

  async update(
    storyId: string,
    taskId: string,
    status: StoryStatus,
  ): Promise<void> {
    await this.storyModel.findOneAndUpdate(
      { _id: storyId, 'tasks._id': taskId },
      { $set: { 'tasks.$.status': status } },
    );

    // Check if all tasks in the story have the "complete" status
    const story = await this.storyModel.findById(storyId);
    if (story && story.tasks.length > 0) {
      const allTasksComplete = story.tasks.every(
        (task) => task.status === 'Done',
      );

      if (allTasksComplete) {
        // Update the status of the story to "complete"
        await this.storyModel.updateOne(
          { _id: storyId },
          { $set: { status: 'Done', doneAt: new Date() } },
        );
      }
    }
  }

  private async _setStats(): Promise<void> {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 10 * 1000);

    const [
      {
        storiesProducedRate,
        storiesCompletedRate,
        completedStories,
        openStories,
      },
    ] = await this.storyModel.aggregate([
      {
        $facet: {
          latestCreatedStories: [
            {
              $match: {
                createdAt: { $gte: startDate },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          latestMinUpdatedStories: [
            {
              $match: {
                updatedAt: { $gte: startDate },
                status: 'Done',
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          completedStoriesList: [
            {
              $match: {
                status: 'Done',
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          openStoriesList: [
            {
              $match: {
                status: { $ne: 'Done' },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          storiesProducedRate: { $size: '$latestCreatedStories' },
          storiesCompletedRate: { $size: '$latestMinUpdatedStories' },
          completedStories: { $size: '$completedStoriesList' },
          openStories: { $size: '$openStoriesList' },
        },
      },
    ]);

    this._storiesSubject.next({
      storiesProducedPerSec: Math.ceil(storiesProducedRate / 10),
      storiesCompletedPerSec: Math.ceil(storiesCompletedRate / 10),
      completedStories,
      openStories,
    });
  }
}
