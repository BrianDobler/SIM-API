function ExponentialDistribution(lambda) {
    this.lambda = lambda;

    this.nextValue = (randomValue) => {
        const x = (-1 / this.lambda) * Math.log(1 - randomValue);
        return (Math.round((x) * 10000.0) / 10000.0);
    };
}

module.exports = ExponentialDistribution;
