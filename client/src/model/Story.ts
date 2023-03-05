export type Task = {
    estimate: number;
    status: 'open' | 'completed';
};
export interface Story {
    status: 'open' | 'completed';
    tasks: Task[];
}
