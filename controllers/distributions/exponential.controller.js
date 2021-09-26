const exponentialDistributionController = {};

exponentialDistributionController.generateValues = async (request, response) => {
    const { body } = request;
    const { lambda, numberOfSamples } = body;

    let values = [];
    for (let index = 0; index < numberOfSamples; index++) {
        let randomValue = Math.random();

        let x = (- 1 / lambda) * Math.log(1 - randomValue);
        x = (Math.round((x) * 10000.0) / 10000.0);

        values[index] = x;
    }
    
    response.status(200)
        .json({
            series: values
        });
};

module.exports = exponentialDistributionController;