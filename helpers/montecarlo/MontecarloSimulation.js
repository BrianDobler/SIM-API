function MontecarloSimulation(taskA1, taskA2, taskA3, taskA4, taskA5) {
    // Naive approach of the montecarlo simulation, to be reviewed.
    this.taskA1 = taskA1;
    this.taskA2 = taskA2;
    this.taskA3 = taskA3;
    this.taskA4 = taskA4;
    this.taskA5 = taskA5;

    this.tasksRunning = false;
    this.assemblyTaskDuration = 1;

    this.simulate = () => {
        if (this.taskA1.completed && this.taskA2.completed && this.taskA3.completed && this.taskA4.completed && this.taskA5.completed) {
            // If all tasks completed. Then set flags to false.
            this.tasksRunning = false;
            this.taskA1.completed = false;
            this.taskA2.completed = false;
            this.taskA3.completed = false;
            this.taskA4.completed = false;
            this.taskA5.completed = false;
        }

        if (this.taskA1.completed && this.taskA4.timeToCompleted == null && !this.taskA4.completed) {
            // If task a1 is completed and task4 is not started. Then start task A4.
            this.taskA4.calculateTimeToComplete();
        }

        if (this.taskA2.completed && this.taskA4.completed && !this.taskA5.completed && this.taskA5.timeToCompleted == null) {
            // If task A2 and A4 are completed, then start A5.
            this.taskA5.calculateTimeToComplete();
        }

        // If there is no tasks running then start new tasks.
        if (!this.tasksRunning) {
            // Calulate the elapsed times of the tasks that have no precedences.
            this.taskA1.calculateTimeToComplete();
            this.taskA2.calculateTimeToComplete();
            this.taskA3.calculateTimeToComplete();

            this.tasksRunning = true; // Set the flag, there are tasks running now.
            this.assemblyTaskDuration = 1;
        }
        console.log(this.taskA1.timeToCompleted);
        console.log(this.taskA2.timeToCompleted);
        console.log(this.taskA3.timeToCompleted);
        console.log(this.taskA4.timeToCompleted);
        console.log(this.taskA5.timeToCompleted);

        // A day less of each task.
        this.assemblyTaskDuration++;
        this.taskA1.aDayLess();
        this.taskA2.aDayLess();
        this.taskA3.aDayLess();
        this.taskA4.aDayLess();
        this.taskA5.aDayLess();
    };

    this.getStateVector = () => ({
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
    });
}
module.exports = MontecarloSimulation;
