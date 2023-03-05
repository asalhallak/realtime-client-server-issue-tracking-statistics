import { Job } from './job';

export default async function taskExecution(job: Job): Promise<Job> {
  function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  await sleep(job.estimate);

  job.status = 'Done';
  return job;
}
