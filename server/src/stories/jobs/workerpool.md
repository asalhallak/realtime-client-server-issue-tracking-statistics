# Workerpool
The Workerpool class is responsible for managing a pool of worker threads that execute taskExecution on incoming Job objects.


## Properties
_pool: This property is a reference to the workerpool instance.
Constructor
constructor(): Creates an instance of the Workerpool class and initializes the _pool property. It also sets up an interval to call _adjustWorkers() every 4000ms.
Public Methods
exec(job: Job): Promise<Job>: This method takes a Job object and returns a promise that resolves to a Job object after execution by the worker pool. The promise is rejected if an error occurs during execution.
Private Methods
_adjustWorkers(): This method checks the current status of the worker pool and adjusts the number of workers accordingly. If the number of workers is less than the minimum default worker count and the worker-tasks ratio is less than the minimum worker-tasks ratio, it increases the number of workers. If the number of workers is greater than the maximum default worker count and the worker-tasks ratio is greater than the maximum worker-tasks ratio, it decreases the number of workers.

_setWorkerCount(count: number): This method sets the number of minimum and maximum workers in the worker pool.

## Constants
MAX_DEFAULT_WORKER_COUNT: This constant defines the maximum number of default workers that can be created by the worker pool.
MIN_DEFAULT_WORKER_COUNT: This constant defines the minimum number of default workers that can be created by the worker pool.
MIN_WORKERS_TASKS_RATIO: This constant defines the minimum worker-tasks ratio.
MAX_WORKERS_TASKS_RATIO: This constant defines the maximum worker-tasks ratio.
Dependencies
The Workerpool class depends on the following:


## Conclusion
The Workerpool class provides a way to manage a pool of worker threads that execute taskExecution on incoming Job objects. The class ensures that the number of workers in the pool is adjusted based on the current workload to optimize the performance of the application. The documentation outlines the properties, constructor, public and private methods, and constants of the Workerpool class, as well as its dependencies.
