import Task from './Task';

export default class MontecarloSimulation {
    // Naive approach of the montecarlo simulation, to be reviewed.
    taskA1: Task;
    taskA2: Task;
    taskA3: Task;
    taskA4: Task;
    taskA5: Task;
    path4: number;
    path5: number;
    assemblyTaskDuration: number;
    assemblyTask45Counter: number;
    simulation: number;
    mean: number;
    min: number;
    max: number;

    constructor(taskA1: Task, taskA2: Task, taskA3: Task, taskA4: Task, taskA5: Task) {
        this.taskA1 = taskA1;
        this.taskA2 = taskA2;
        this.taskA3 = taskA3;
        this.taskA4 = taskA4;
        this.taskA5 = taskA5;

        this.path4 = 0;
        this.path5 = 0;
        this.assemblyTaskDuration = 0;
        this.assemblyTask45Counter = 0;
        this.simulation = 0;
        this.mean = 0;
        this.min = 0;
        this.max = 0;
    }

    simulate = (): void => {
        this.simulation++;

        // Set all task durations.
        this.taskA1.calculateTimeToComplete();
        this.taskA2.calculateTimeToComplete();
        this.taskA3.calculateTimeToComplete();
        this.taskA4.calculateTimeToComplete();
        this.taskA5.calculateTimeToComplete();

        // Add the precedence. Make the path to completed with the A4 and A1 Path.
        this.path4 = this.taskA4.timeToCompleted + this.taskA1.timeToCompleted;

        // Add the precedence. Make the path to completed with the A4-A2 and A5 Path.
        this.path5 = this.taskA5.timeToCompleted;
        this.path5 += (this.taskA2.timeToCompleted >= this.taskA4.timeToCompleted) ? this.taskA2.timeToCompleted : this.taskA4.timeToCompleted;

        if (this.assemblyTaskDuration <= 45) {
            // If the elapsed time of a task is less than 45 days.
            this.assemblyTask45Counter++;
        }

        // Set the assembly task duration. Based on the longest path.
        this.assemblyTaskDuration = (this.path4 >= this.path5) ? this.path4 : this.path5;

        this.getMean();
        this.updateBounds();
    }

    getMean = (): void => {
        this.mean = Math.round((((this.mean * (this.simulation - 1)) + this.assemblyTaskDuration) / this.simulation) * 100.0) / 100.0;
    }

    getProbability = (): number => (Math.round((this.assemblyTask45Counter / this.simulation) * 10000.0) / 10000.0);

    updateBounds = (): void => {
        // Checks for the min or max assembly task duration and stores it.
        if (this.min === 0) {
            this.min = this.assemblyTaskDuration;
        } else if (this.max <= this.assemblyTaskDuration) {
            this.max = this.assemblyTaskDuration;
        } else if (this.min >= this.assemblyTaskDuration) {
            this.min = this.assemblyTaskDuration;
        }
    }

    getStateVector = (): any => ({
        // Return all the variables to be checked and displayed on the client.
        // This is the state vector.
        randomA1: this.taskA1.randomValue,
        A1DaysLeft: this.taskA1.timeToCompleted,
        randomA2: this.taskA2.randomValue,
        A2DaysLeft: this.taskA2.timeToCompleted,
        randomA3: this.taskA3.randomValue,
        A3DaysLeft: this.taskA3.timeToCompleted,
        randomA4: this.taskA4.randomValue,
        A4DaysLeft: this.taskA4.timeToCompleted,
        randomA5: this.taskA5.randomValue,
        A5DaysLeft: this.taskA5.timeToCompleted,
        path4: this.path4,
        path5: this.path5,
        assemblyTaskDuration: this.assemblyTaskDuration,
        day: this.simulation,
        mean: this.mean,
    });
}
