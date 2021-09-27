const ExponentialDistribution = require('../../helpers/distributions/ExponentialDistribution');

const exponentialDistributionController = {};
exponentialDistributionController.generateValues = async (request, response) => {
    const { body } = request;
    const { lambda, numberOfSamples } = body;

    const distribution = new ExponentialDistribution(lambda);
    const values = [];
    for (let i = 0; i < numberOfSamples; i++) {
        const randomValue = Math.random();
        const x = distribution.nextValue(randomValue);
        values[i] = x;
    }

    response.status(200)
        .json({
            series: values,
        });
};

module.exports = exponentialDistributionController;
