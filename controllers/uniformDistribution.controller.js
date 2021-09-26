class UniformDistribution {
    constructor(lowerBound, upperBound, numberOfValues) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.numberOfValues = numberOfValues;
    }

    generateValues() {
        let values = [];

        for (let index = 0; index < this.numberOfValues; index++) {
            let x = this.lowerBound + (Math.random() * (this.upperBound - this.lowerBound));
            x = (Math.round((x) * 10000.0) / 10000.0);
            values[index] = x;
        }
        return values;
    }
}

module.exports = UniformDistribution;