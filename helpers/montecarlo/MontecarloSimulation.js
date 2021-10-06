function MontecarloSimulation(taskA1, taskA2, taskA3, taskA4, taskA5) {
    // Naive approach of the montecarlo simulation, to be reviewed.
    this.taskA1 = taskA1;
    this.taskA2 = taskA2;
    this.taskA3 = taskA3;
    this.taskA4 = taskA4;
    this.taskA5 = taskA5;
    this.dayNumber = 0;

    this.tasksRunning = false;
    this.assemblyTaskDuration = 0;
    this.lastAssemblyTaskDuration = 0;
    this.assemblyTaskCounter = 0;
    this.assemblyTask45Counter = 0;
    this.assemblyTaskFinishedDay = 0;
    this.mean = 0;
    this.min = 0;
    this.max = 0;

    this.simulate = () => {
        this.dayNumber++;
        if (this.taskA1.completed && this.taskA2.completed && this.taskA3.completed && this.taskA4.completed && this.taskA5.completed) {
            // If all tasks completed. Then set flags to false.
            this.tasksRunning = false;
            this.taskA1.completed = false;
            this.taskA2.completed = false;
            this.taskA3.completed = false;
            this.taskA4.completed = false;
            this.taskA5.completed = false;

            if (this.assemblyTaskDuration !== 0 && this.lastAssemblyTaskDuration === 0) {
                // Set the minium assembly task duration.
                this.min = this.assemblyTaskDuration;
            }

            this.lastAssemblyTaskDuration = this.assemblyTaskDuration;

            if (this.lastAssemblyTaskDuration <= 45) {
                // If the elapsed time of a task is less than 45 days.
                this.assemblyTask45Counter++;
            }

            this.setNewAssemblyTaskDuration();
            this.assemblyTaskFinishedDay++;

            this.mean = this.getMean();
            this.assemblyTaskCounter++;
        }

        // If there is no tasks running then start new tasks.
        if (!this.tasksRunning) {
            // Calulate the elapsed times of the tasks that have no precedences.
            this.taskA1.calculateTimeToComplete();
            this.taskA2.calculateTimeToComplete();
            this.taskA3.calculateTimeToComplete();

            this.tasksRunning = true; // Set the flag, there are tasks running now.
            this.assemblyTaskDuration = 1; // Reset the assembly task duration.
        }

        if (this.taskA1.completed && this.taskA4.timeToCompleted === '-' && !this.taskA4.completed) {
            // If task a1 is completed and task4 is not started. Then start task A4.
            this.taskA4.calculateTimeToComplete();
        }

        if (this.taskA2.completed && this.taskA4.completed && !this.taskA5.completed && this.taskA5.timeToCompleted === '-') {
            // If task A2 and A4 are completed, then start A5.
            this.taskA5.calculateTimeToComplete();
        }
    };

    this.next = () => {
        // A day less of each task.
        this.taskA1.aDayLess();
        this.taskA1.randomValue = '-';
        this.taskA2.aDayLess();
        this.taskA2.randomValue = '-';
        this.taskA3.aDayLess();
        this.taskA3.randomValue = '-';
        this.taskA4.aDayLess();
        this.taskA4.randomValue = '-';
        this.taskA5.aDayLess();
        this.taskA5.randomValue = '-';

        this.assemblyTaskDuration++;
    };

    this.getMean = () => {
        const x = (1 / this.assemblyTaskFinishedDay) * (((this.assemblyTaskFinishedDay - 1) * this.mean) + this.lastAssemblyTaskDuration);
        return (Math.round((x) * 10000.0) / 10000.0);
    };

    this.setNewAssemblyTaskDuration = () => {
        // Checks for the min or max assembly task duration and stores it.
        if (this.max <= this.lastAssemblyTaskDuration) {
            this.max = this.lastAssemblyTaskDuration;
        } else if (this.min >= this.lastAssemblyTaskDuration) {
            this.min = this.lastAssemblyTaskDuration;
        }
    };

    this.getProbability = () => (Math.round((this.assemblyTask45Counter / this.assemblyTaskCounter) * 10000.0) / 10000.0);

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
        lastAssemblyTaskDuration: this.lastAssemblyTaskDuration,
        mean: this.mean,
    });
}
module.exports = MontecarloSimulation;
