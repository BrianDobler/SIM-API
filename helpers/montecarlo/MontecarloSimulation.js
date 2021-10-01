const UniformDistribution = require('../distributions/UniformDistribution');
const ExponentialDistribution = require('../distributions/ExponentialDistribution');

function MontecarloSimulation(taskA1, taskA2, taskA3, taskA4, taskA5) {
    // Naive approach of the montecarlo simulation, to be reviewed.
    this.taskA1 = taskA1;
    this.taskA2 = taskA2;
    this.taskA4 = taskA3;
    this.taskA3 = taskA4;
    this.taskA5 = taskA5;
    this.tasksRunning = false;
    this.stateVector = [];

    this.setTaskDistributions = () => {
        // Create objects for each distribution. For now they're all are fixed.
        const taskA1Distribution = new UniformDistribution(20, 30);
        this.taskA1.setDistribution(taskA1Distribution);

        const taskA2Distribution = new UniformDistribution(30, 50);
        this.taskA2.setDistribution(taskA2Distribution);

        const taskA3Distribution = new ExponentialDistribution(30);
        this.taskA3.setDistribution(taskA3Distribution);

        const taskA4Distribution = new UniformDistribution(10, 20);
        this.taskA4.setDistribution(taskA4Distribution);

        const taskA5Distribution = new ExponentialDistribution(5);
        this.taskA5.setDistribution(taskA5Distribution);
    };

    this.simulate = (numberOfDays) => {
        for (let day = 1; day <= numberOfDays; day++) { // Counter starts from 1, 'cause needed to pass rows to front.
            // If there is no tasks running then start new tasks.
            if (!this.tasksRunning) {
                // Calulate the elapsed times of the tasks that have no precedences.
                this.taskA1.calculateTimeToComplete();
                this.taskA2.calculateTimeToComplete();
                this.taskA3.calculateTimeToComplete();

                this.tasksRunning = true; // Set the flag, there are tasks running now.
            }

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

            console.log(
                `TASK A1: ${this.taskA1.timeToCompleted} | `
                + `TASK A2: ${this.taskA2.timeToCompleted} | `
                + `TASK A3: ${this.taskA3.timeToCompleted} | `
                + `TASK A4: ${this.taskA4.timeToCompleted} | `
                + `TASK A5: ${this.taskA5.timeToCompleted}`,
            );
            // A day less of each task.
            this.taskA1.aDayLess();
            this.taskA2.aDayLess();
            this.taskA3.aDayLess();
            this.taskA4.aDayLess();
            this.taskA5.aDayLess();
        }
    };
}

module.exports = MontecarloSimulation;
