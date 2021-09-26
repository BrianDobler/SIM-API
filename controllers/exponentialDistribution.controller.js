class ExponentialDistribution {

    constructor(lambda, numberOfValues) {
        this.lambda = lambda;
        this.numberOfValues = numberOfValues;
    }

    generateValues() {
        let values = [];
        for (let index = 0; index < this.numberOfValues; index++) {
            let randomValue = Math.random();

            let x = (- 1 / this.lambda) * Math.log(1 - randomValue);
            x = (Math.round((x) * 10000.0) / 10000.0);

            values[index] = x;
        }
        return values;
    }
}

module.exports = ExponentialDistribution;