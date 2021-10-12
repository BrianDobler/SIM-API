export default class UniformDistribution {
    lowerBound: number;
    upperBound: number;

    constructor(lowerBound: number, upperBound: number) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    nextValue = (randomValue: number) => {
        const x = this.lowerBound + (randomValue * (this.upperBound - this.lowerBound));
        return (Math.round((x) * 10000.0) / 10000.0);
    };
}
