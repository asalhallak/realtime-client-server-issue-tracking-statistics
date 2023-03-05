export type TaskDto = {
  estimate: number;
};
export interface CreateStoryDto {
  tasks: TaskDto[];
}
