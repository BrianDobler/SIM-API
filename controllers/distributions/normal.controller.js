const normalDistributionController = {};

normalDistributionController.generateValues = async (request, response) => {
    const { body } = request;
    const { sigma, mu, numberOfSamples } = body;

    let values = [];
    let x;

    for (let index = 0; index < numberOfSamples; index++) {
        let rnd1 = Math.random();
        let rnd2 = Math.random();

        if (numberOfSamples % 2 == 0) {
            x = (Math.sqrt(-2 * Math.log(rnd1)) * Math.cos(2 * Math.PI * rnd2)) * sigma + mu;
        } else {
            x = (Math.sqrt(-2 * Math.log(rnd1)) * Math.sin(2 * Math.PI * rnd2)) * sigma + mu;
        }
        x = (Math.round((x) * 10000.0) / 10000.0);

        values[index] = x;
    }

    response.status(200)
        .json({
            series: values
        });
};

module.exports = normalDistributionController;
