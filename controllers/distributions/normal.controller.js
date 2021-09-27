const NormalDistribution = require('../../helpers/distributions/NormalDistribution');

const normalDistributionController = {};
normalDistributionController.generateValues = async (request, response) => {
    const { body } = request;
    const { sigma, mu, numberOfSamples } = body;

    const distribution = new NormalDistribution(sigma, mu);
    const values = [];
    let x;

    for (let i = 0; i < numberOfSamples; i++) {
        const randomValue1 = Math.random();
        const randomValue2 = Math.random();
        x = distribution.nextValue(randomValue1, randomValue2);
        values[i] = x;
    }

    response.status(200)
        .json({
            series: values,
        });
};

module.exports = normalDistributionController;
