export default class NormalDistribution {
    sigma: number;
    mu: number;

    constructor(sigma: number, mu:number) {
        this.sigma = sigma;
        this.mu = mu;
    }

    nextValue = (randomValue1: number, randomValue2: number) => {
        const x = (Math.sqrt(-2 * Math.log(randomValue1)) * Math.cos(2 * Math.PI * randomValue2)) * this.sigma + this.mu;
        return (Math.round((x) * 10000.0) / 10000.0);
    }
}
