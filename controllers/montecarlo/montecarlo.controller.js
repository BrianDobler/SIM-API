const MontecarloSimulation = require('../../helpers/montecarlo/MontecarloSimulation');
const Task = require('../../helpers/montecarlo/Task');

const montecarloContoller = {};
montecarloContoller.simulate = async (request, response) => {
    const { body } = request;
    const {
        numberOfSimulations,
        generatorType,
        activities,
    } = body;

    // Create the tasks objects to pass to the montecarlo simulation.
    const tasks = [];
    for (let i = 0; i < 5; i++) {
        tasks[i] = new Task();
        tasks[i].setDistribution(activities[i].distributionName, activities[i].distribution);
        tasks[i].setGenerator(generatorType);
    }

    // Create the montecarlo simulation.
    const montecarloRows = [];
    const montecarlo = new MontecarloSimulation(tasks[0], tasks[1], tasks[2], tasks[3], tasks[4]);
    for (let i = 0; i < numberOfSimulations; i++) {
        montecarlo.simulate();
        montecarloRows[i] = montecarlo.getStateVector();
    }

    response
        .status(200)
        .json({
            response: 'ok',
            activities: montecarloRows,
        });
};

module.exports = montecarloContoller;
