import * as workerpool from 'workerpool';
import { Injectable } from '@nestjs/common';
import taskExecution from './taskExecution';
import { Job } from './job';

const MAX_DEFAULT_WORKER_COUNT = 2;
const MIN_DEFAULT_WORKER_COUNT = 2;

const MIN_WORKERS_TASKS_RATIO = 0.33;
const MAX_WORKERS_TASKS_RATIO = 0.77;

@Injectable()
export class Workerpool {
  private _pool;

  constructor() {
    this._pool = workerpool.pool({
      minWorkers: MIN_DEFAULT_WORKER_COUNT,
      maxWorkers: MAX_DEFAULT_WORKER_COUNT,
    });

    setInterval(() => this._adjustWorkers(), 4000);
  }

  async exec(job: Job): Promise<Job> {
    return new Promise((resolve, reject) => {
      this._pool
        .exec(taskExecution, [job])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  private _adjustWorkers() {
    const { pendingTasks, totalWorkers } = this._pool.stats();

    const workersTasksRatio = totalWorkers / (pendingTasks || 1);

    const increase = workersTasksRatio < MIN_WORKERS_TASKS_RATIO;
    if (increase) {
      this._setWorkerCount(totalWorkers + 1);
      return;
    }

    const decrease =
      totalWorkers > MAX_DEFAULT_WORKER_COUNT &&
      workersTasksRatio > MAX_WORKERS_TASKS_RATIO;

    if (decrease) {
      this._setWorkerCount(totalWorkers - 1);
      return;
    }
  }
  private _setWorkerCount(count: number) {
    this._pool.maxWorkers = count;
    this._pool.minWorkers = count;
  }
}
