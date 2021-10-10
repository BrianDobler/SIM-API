function MontecarloSimulation(taskA1, taskA2, taskA3, taskA4, taskA5) {
    // Naive approach of the montecarlo simulation, to be reviewed.
    this.taskA1 = taskA1;
    this.taskA2 = taskA2;
    this.taskA3 = taskA3;
    this.taskA4 = taskA4;
    this.taskA5 = taskA5;

    this.assemblyTaskDuration = 0;
    this.assemblyTask45Counter = 0;
    this.dayNumber = 0;
    this.mean = 0;
    this.min = 0;
    this.max = 0;

    this.simulate = () => {
        this.dayNumber++;

        // Set all task durations that have no precedences first.
        this.taskA1.calculateTimeToComplete();
        this.taskA2.calculateTimeToComplete();
        this.taskA3.calculateTimeToComplete();

        // Now. Set the task duration of the task 4.
        this.taskA4.calculateTimeToComplete();
        // Add the precedence.
        this.taskA4.timeToCompleted += this.taskA1.timeToCompleted;

        // Set the duration of the task 5.
        this.taskA5.calculateTimeToComplete();
        this.taskA5.timeToCompleted += (this.taskA2.timeToCompleted >= this.taskA4.timeToCompleted) ? this.taskA2.timeToCompleted : this.taskA4.timeToCompleted;

        if (this.assemblyTaskDuration <= 45) {
            // If the elapsed time of a task is less than 45 days.
            this.assemblyTask45Counter++;
        }

        this.assemblyTaskDuration = this.taskA1.timeToCompleted
            + this.taskA2.timeToCompleted
            + this.taskA3.timeToCompleted
            + this.taskA4.timeToCompleted
            + this.taskA5.timeToCompleted;

        this.getMean();
        this.getBounds();
    };

    this.getMean = () => {
        const x = (1 / this.dayNumber) * (((this.dayNumber - 1) * this.mean) + this.assemblyTaskDuration);
        this.mean = (Math.round((x) * 100) / 100);
    };

    this.getProbability = () => (Math.round((this.assemblyTask45Counter / this.dayNumber) * 10000.0) / 10000.0);

    this.getBounds = () => {
        // Checks for the min or max assembly task duration and stores it.
        if (this.min === 0) {
            this.min = this.assemblyTaskDuration;
        } else if (this.max <= this.assemblyTaskDuration) {
            this.max = this.assemblyTaskDuration;
        } else if (this.min >= this.assemblyTaskDuration) {
            this.min = this.assemblyTaskDuration;
        }
    };

    this.getStateVector = () => ({
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
        assemblyTaskDuration: this.assemblyTaskDuration,
        day: this.dayNumber,
        mean: this.mean,
    });
}
module.exports = MontecarloSimulation;
