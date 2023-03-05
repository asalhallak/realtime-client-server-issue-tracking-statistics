import { StoryStatus } from '../models/story.model';

export class Job {
  taskId: string;
  storyId: string;
  estimate: number;
  status: StoryStatus;
}
