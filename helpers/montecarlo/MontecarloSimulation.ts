import Task from './Task';
import { computeTStudent } from '../distributions/TStudent';

export class MontecarloSimulation {
    // Naive approach of the montecarlo simulation, to be reviewed.
    taskA1: Task;
    taskA2: Task;
    taskA3: Task;
    taskA4: Task;
    taskA5: Task;
    path1: number = 0;
    path2: number = 0;
    path3: number = 0;
    assemblyTaskDuration: number = 0;
    assemblyTask45Counter: number = 0;
    simulation: number = 0;
    mean: number = 0;
    min: number = 0;
    max: number = 0;
    variance: number = 0;
    standardDeviation: number = 0;
    dateNC90: number = 0;
    activity1: number = 0;
    activity2: number = 0;
    activity3: number = 0;
    activity4: number = 0;
    activity5: number = 0;
    criticalA1: number = 0;
    criticalA2: number = 0;
    criticalA3: number = 0;
    criticalA4: number = 0;
    criticalA5: number = 0;
    criticalPath: string = '';

    constructor(taskA1: Task, taskA2: Task, taskA3: Task, taskA4: Task, taskA5: Task) {
        this.taskA1 = taskA1;
        this.taskA2 = taskA2;
        this.taskA3 = taskA3;
        this.taskA4 = taskA4;
        this.taskA5 = taskA5;
    }

    simulate = (): void => {
        this.simulation++;

        // Set all task durations.
        this.taskA1.calculateTimeToComplete();
        this.taskA2.calculateTimeToComplete();
        this.taskA3.calculateTimeToComplete();
        this.taskA4.calculateTimeToComplete();
        this.taskA5.calculateTimeToComplete();

        // Path 1 (A1 - A5 - A5)
        this.path1 = this.taskA4.timeToCompleted + this.taskA1.timeToCompleted + this.taskA5.timeToCompleted;

        // Path 2 (A2 - A5)
        this.path2 = this.taskA2.timeToCompleted + this.taskA5.timeToCompleted;

        // Path 3 (A3)
        this.path3 = this.taskA3.timeToCompleted;

        // this.path5 = this.taskA5.timeToCompleted;
        // this.path5 += (this.taskA2.timeToCompleted >= this.taskA4.timeToCompleted) ? this.taskA2.timeToCompleted : this.taskA4.timeToCompleted;

        if (this.assemblyTaskDuration <= 45) {
            // If the elapsed time of a task is less than 45 days.
            this.assemblyTask45Counter++;
        }

        // Set the assembly task duration. Based on the longest path.
        this.setAssemblyTaskDuration();

        // Update from the last row the parameters.
        this.getMean();
        this.getVariance();
        this.getStandardDeviation();
        this.getDateNC90();
        this.updateBounds();

        this.activity1 = this.assemblyTaskDuration - this.taskA5.timeToCompleted - this.taskA4.timeToCompleted - this.taskA1.timeToCompleted;
        this.activity2 = this.assemblyTaskDuration - this.taskA5.timeToCompleted - this.taskA2.timeToCompleted;
        this.activity3 = this.assemblyTaskDuration - this.taskA3.timeToCompleted;
        this.activity4 = this.assemblyTaskDuration - this.taskA5.timeToCompleted - this.taskA4.timeToCompleted;
        this.activity5 = this.assemblyTaskDuration - this.taskA5.timeToCompleted;
        this.calculateCriticalPath();
    }

    calculateCriticalPath = (): void => {
        if (this.criticalPath === 'C1') {
            this.criticalA1 = Math.round((((this.criticalA1 * (this.simulation - 1)) + 1) / this.simulation) * 10) / 10;
            this.criticalA2 = Math.round((((this.criticalA2 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA3 = Math.round((((this.criticalA3 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA4 = Math.round((((this.criticalA4 * (this.simulation - 1)) + 1) / this.simulation) * 10) / 10;
            this.criticalA5 = Math.round((((this.criticalA5 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
        } else if (this.criticalPath === 'C2') {
            this.criticalA1 = Math.round((((this.criticalA1 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA2 = Math.round((((this.criticalA2 * (this.simulation - 1)) + 1) / this.simulation) * 10) / 10;
            this.criticalA3 = Math.round((((this.criticalA3 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA4 = Math.round((((this.criticalA4 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA5 = Math.round((((this.criticalA5 * (this.simulation - 1)) + 1) / this.simulation) * 10) / 10;
        } else if (this.criticalPath === 'C3') {
            this.criticalA1 = Math.round((((this.criticalA1 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA2 = Math.round((((this.criticalA2 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA3 = Math.round((((this.criticalA3 * (this.simulation - 1)) + 1) / this.simulation) * 10) / 10;
            this.criticalA4 = Math.round((((this.criticalA4 * (this.simulation - 1)) + 0) / this.simulation) * 10) / 10;
            this.criticalA5 = Math.round((((this.criticalA5 * (this.simulation - 1)) + 1) / this.simulation) * 10) / 10;
        }
    }

    setAssemblyTaskDuration = (): void => {
        this.assemblyTaskDuration = Math.max(this.path1, this.path2, this.path3);
        if (Math.max(this.path1, this.path2, this.path3) === this.path1) {
            this.criticalPath = 'C1';
        } else if (Math.max(this.path1, this.path2, this.path3) === this.path2) {
            this.criticalPath = 'C2';
        } else {
            this.criticalPath = 'C3';
        }
    }

    getMean = (): void => {
        this.mean = Math.round((((this.mean * (this.simulation - 1)) + this.assemblyTaskDuration) / this.simulation) * 100.0) / 100.0;
        // this.mean = ((this.mean * (this.simulation - 1)) + this.assemblyTaskDuration) / this.simulation;
    }

    getProbability = (): number => (Math.round((this.assemblyTask45Counter / this.simulation) * 10000.0) / 10000.0);

    getVariance = (): void => {
        const variance = (((this.simulation - 2) * this.variance) + ((this.simulation / (this.simulation - 1)) * ((this.mean - this.assemblyTaskDuration) ** 2))) / (this.simulation - 1);
        this.variance = (this.simulation === 1) ? 0 : Math.round((variance) * 10000.0) / 10000.0;
    }

    getStandardDeviation = (): void => {
        const standardDeviation = Math.sqrt(this.variance);
        this.standardDeviation = Math.round((standardDeviation) * 10000.0) / 10000.0;
    }

    getDateNC90 = (): void => {
        // Calculates the date to fix if we're looking for a level of trust of 90% of completing the task on that day or before.
        const x = this.mean + (computeTStudent(0.90, this.simulation - 1) * this.standardDeviation);
        this.dateNC90 = (this.simulation === 1) ? 0 : Math.round((x) * 10000.0) / 10000.0;
    }

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
        path1: this.path1,
        path2: this.path2,
        path3: this.path3,
        assemblyTaskDuration: this.assemblyTaskDuration,
        day: this.simulation,
        mean: this.mean,
        variance: this.variance,
        standardDeviation: this.standardDeviation,
        dateNC90: this.dateNC90,
        A1: this.activity1,
        A2: this.activity2,
        A3: this.activity3,
        A4: this.activity4,
        A5: this.activity5,
        criticalPath: this.criticalPath,
        criticalA1: this.criticalA1,
        criticalA2: this.criticalA2,
        criticalA3: this.criticalA3,
        criticalA4: this.criticalA4,
        criticalA5: this.criticalA5,
    });
}
