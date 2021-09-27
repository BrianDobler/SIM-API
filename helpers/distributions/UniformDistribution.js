function UniformDistribution(lowerBound, upperBound) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;

    this.nextValue = (randomValue) => {
        const x = this.lowerBound + (randomValue * (this.upperBound - this.lowerBound));
        return (Math.round((x) * 10000.0) / 10000.0);
    };
}

module.exports = UniformDistribution;
