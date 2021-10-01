const MontecarloSimulation = require('../../helpers/montecarlo/MontecarloSimulation');
const Task = require('../../helpers/montecarlo/Task');

const montecarloContoller = {};
montecarloContoller.simulate = async (request, response) => {
    const { body } = request;
    const { daysToSimulate } = body;

    // Create the tasks objects to pass to the montecarlo simulation.
    const taskA1 = new Task();
    const taskA2 = new Task();
    const taskA3 = new Task();
    const taskA4 = new Task();
    const taskA5 = new Task();

    // Create the montecarlo simulation.
    const montecarlo = new MontecarloSimulation(taskA1, taskA2, taskA3, taskA4, taskA5);
    montecarlo.setTaskDistributions(); // Set the distributions to calculated task's time to complete.

    montecarlo.simulate(daysToSimulate);

    response
        .status(418)
        .json({ response: 'ok' });
};

module.exports = montecarloContoller;
