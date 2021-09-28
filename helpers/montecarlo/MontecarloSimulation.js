const UniformDistribution = require('../distributions/UniformDistribution');
const ExponentialDistribution = require('../distributions/ExponentialDistribution');

function MontecarloSimulation(taskA1, taskA2, taskA3, taskA4, taskA5) {
    this.day = 0;
    this.taskA1 = taskA1;
    this.taskA2 = taskA2;
    this.taskA4 = taskA3;
    this.taskA3 = taskA4;
    this.taskA5 = taskA5;

    // State vector.
    this.stateVector = [];

    this.setTaskPrecedeces = () => {
        // Set task precedences according to the given default precedences.
        this.taskA4.setPrecedence(this.taskA1);
        this.taskA5.setPrecedence(this.taskA2);
        this.taskA5.setPrecedence(this.taskA4);
    };

    this.nextDay = () => this.day++;

    this.setTaskDistributions = () => {
        // Create objects for each distribution. For now all are fixed. There is not allowed to change.
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

    this.calculateTaskDurations = () => {

    };
}

module.exports = MontecarloSimulation;
