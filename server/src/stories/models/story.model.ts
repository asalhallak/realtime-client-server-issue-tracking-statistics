import { HydratedDocument } from 'mongoose';
import { CreateStoryDto } from '../dtos/create-story.request';

export type StoryStatus = 'Open' | 'Done';

export type TaskModel = {
  id?: string;
  estimate: number;
  status: StoryStatus;
};

export class StoryModel {
  id?: string;
  status: StoryStatus = 'Open';
  doneAt?: Date;
  tasks: TaskModel[];

  parseDocument(model: HydratedDocument<any>) {
    this.id = model._id.toString();
    this.status = model.state;
    this.doneAt = model.doneAt;
    this.tasks = model.tasks.map((task) => ({
      id: task._id.toString(),
      status: task.status,
      estimate: task.estimate,
    }));
    return this;
  }

  parseDto(dto: CreateStoryDto) {
    this.tasks = dto.tasks.map((task) => {
      return {
        status: 'Open',
        estimate: task.estimate,
      };
    });
    return this;
  }
}
