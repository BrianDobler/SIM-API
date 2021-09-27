const UniformDistribution = require('../../helpers/distributions/UniformDistribution');

const uniformDistributionContoller = {};
uniformDistributionContoller.generateValues = async (request, response) => {
    const { body } = request;
    const { lowerBound, upperBound, numberOfSamples } = body;

    const distribution = new UniformDistribution(lowerBound, upperBound);
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

module.exports = uniformDistributionContoller;
