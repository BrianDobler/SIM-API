function NormalDistribution(sigma, mu) {
    this.sigma = sigma;
    this.mu = mu;

    this.nextValue = (randomValue1, randomValue2) => {
        const x = (Math.sqrt(-2 * Math.log(randomValue1)) * Math.cos(2 * Math.PI * randomValue2)) * this.sigma + this.mu;
        return (Math.round((x) * 10000.0) / 10000.0);
    };
}

module.exports = NormalDistribution;
