const UniformDistribution = require('../distributions/UniformDistribution');
const NormalDistribution = require('../distributions/NormalDistribution');
const ExponentialDistribution = require('../distributions/ExponentialDistribution');
const LCG = require('../generators/LinearCongruentialGenerator');

function Task() {
    this.distribution = null;
    this.completed = false;
    this.timeToCompleted = null;
    this.generator = null;

    this.setDistribution = (distributionType, parameters) => {
        // Set the distribution of the task.
        if (distributionType === 'uniform') {
            const taskDistribution = new UniformDistribution(parameters.A, parameters.B);
            this.distribution = taskDistribution;
        } else if (distributionType === 'normal') {
            const taskDistribution = new NormalDistribution(parameters.mu, parameters.sigma);
            this.distribution = taskDistribution;
        } else if (distributionType === 'exponential') {
            const taskDistribution = new ExponentialDistribution(parameters.lambda);
            this.distribution = taskDistribution;
        }
    };

    this.setGenerator = (generator) => {
        // Set the random number generator for the task.
        this.generator = (generator == null) ? Math : new LCG(generator.mod, generator.a, generator.c, generator.seed);
    };

    this.calculateTimeToComplete = () => {
        // Calculate the tsak duration based on the probability.
        const randomValue1 = this.generator.random();
        const randomValue2 = this.generator.random();

        this.timeToCompleted = Math.floor(this.distribution.nextValue(randomValue1, randomValue2));
        this.completed = false;
    };

    this.aDayLess = () => {
        // Decrement a day of time to complete a task.
        if (this.timeToCompleted > 0) {
            this.timeToCompleted--;
        } else if (this.timeToCompleted == null) {
            return null; // If there is no days to decrement simply do nothing.
        } else { // If no days. Completed TRUE, Time to completed reset.
            this.timeToCompleted = null;
            this.completed = true;
        }
        return true; // Not sure how to perform this. But now it's working.
    };
}

module.exports = Task;
