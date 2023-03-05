import { Injectable } from '@nestjs/common';
import { StoriesRepository } from '../../database/stories/stories.repository';
import { CreateStoryDto } from '../dtos/create-story.request';
import { Workerpool } from '../jobs/workerpool';
import { StoryModel } from '../models/story.model';
import { Job } from '../jobs/job';
import { StoriesGateway } from '../gateway/stories.gateway';

@Injectable()
export class StoriesService {
  constructor(
    private readonly _storiesRepository: StoriesRepository,
    private readonly _workerpool: Workerpool,
    private readonly _storiesGateway: StoriesGateway,
  ) {
    this._storiesRepository.storiesUpdates.subscribe((message) =>
      this._storiesGateway.emitStats(message),
    );
    this._storiesGateway.$story.subscribe((story) => {
      this._handleStory(story);
    });
  }

  private async _handleStory(story: CreateStoryDto) {
    const storyModel = new StoryModel().parseDto(story);

    const storyEntity = await this._storiesRepository.create(storyModel);
    const jobs = storyEntity.tasks.map((task) => {
      const job: Job = {
        storyId: storyEntity.id,
        taskId: task.id,
        status: task.status,
        estimate: task.estimate,
      };
      return job;
    });

    jobs.forEach((job) => {
      this._workerpool.exec(job).then((job) => {
        this._storiesRepository.update(job.storyId, job.taskId, job.status);
      });
    });
  }
}
