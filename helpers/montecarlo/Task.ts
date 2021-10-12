import Generator from '../generators/Generator';
import UniformDistribution from '../distributions/UniformDistribution';
import NormalDistribution from '../distributions/NormalDistribution';
import ExponentialDistribution from '../distributions/ExponentialDistribution';

export default class Task {
    distribution: any;
    timeToCompleted: number;
    generator: any;
    randomValue: number;

    constructor() {
        this.timeToCompleted = 0;
        this.randomValue = 0;
    }

    setDistribution = (distributionType: String, parameters: any) => {
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
    }

    setGenerator = (generator: any) => {
        // Set the random number generator for the task.
        this.generator = (generator == null) ? Math : new Generator(generator.mod, generator.a, generator.c, generator.seed);
    };

    calculateTimeToComplete = () => {
        // Calculate the task duration based on the probability.
        const x1 = Math.round((this.generator.random()) * 10000.0) / 10000.0;
        const x2 = Math.round((this.generator.random()) * 10000.0) / 10000.0;
        // Make sure that the random generated number is not rounded to one.
        this.randomValue = (x1 === 1) ? 0.9999 : x1;
        const randomValue2 = (x2 === 1) ? 0.9999 : x2;

        this.timeToCompleted = Math.floor(this.distribution.nextValue(this.randomValue, randomValue2));
    };
}
