export default class ExponentialDistribution {
    lambda: number;

    constructor(lambda: number) {
        this.lambda = lambda;
    }

    nextValue = (randomValue: number) => {
        const x = -this.lambda * Math.log(1 - randomValue);
        return (Math.round((x) * 10000.0) / 10000.0);
    }
}
