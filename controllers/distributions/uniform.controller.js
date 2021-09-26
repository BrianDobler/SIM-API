const uniformDistributionContoller = {};

uniformDistributionContoller.generateValues = async (request, response) => {
    const { body } = request;
    const { lowerBound, upperBound, numberOfSamples } = body;
    
    let values = [];

    for (let index = 0; index < numberOfSamples; index++) {
        let x = lowerBound + (Math.random() * (upperBound - lowerBound));
        x = (Math.round((x) * 10000.0) / 10000.0);
        values[index] = x;
    }

    response.status(200)
        .json({
            series: values
        });
};

module.exports = uniformDistributionContoller;