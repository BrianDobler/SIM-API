import { MontecarloSimulation } from '../../helpers/montecarlo/MontecarloSimulation';
import Task from '../../helpers/montecarlo/Task';

export const montecarloContoller: any = {};
montecarloContoller.simulate = async (request: any, response: any) => {
    const { body } = request;
    const {
        numberOfSimulations,
        from,
        to,
        generatorType,
        activities,
    } = body;

    // Create the tasks objects to pass to the montecarlo simulation.
    const tasks = [];
    for (let i = 0; i < 5; i++) {
        tasks[i] = new Task();
        // Set the parameters of the distribution of each task.
        tasks[i].setDistribution(activities[i].distributionName, activities[i].distribution);
        tasks[i].setGenerator(generatorType);
    }

    // Create the montecarlo simulation.
    const montecarloRows = [];
    const montecarlo = new MontecarloSimulation(tasks[0], tasks[1], tasks[2], tasks[3], tasks[4]);

    // Get the initial conditions of the simulation.
    montecarloRows[0] = montecarlo.getStateVector();

    for (let i = 1; i <= numberOfSimulations; i++) {
        montecarlo.simulate(); // Simulate one day.

        if (i <= 20 || ((i % 10000) === 0) || (i >= from && i <= to)) {
            // Store the state vector if the simulation number fits on the given parameters.
            montecarloRows.push(montecarlo.getStateVector());
        }
    }

    response
        .status(200) // All ok. Return 200.
        .json({
            response: 'ok',
            activities: montecarloRows,
            minValue: montecarlo.min,
            maxValue: montecarlo.max,
            probFinishedLess45days: montecarlo.getProbability(),
            mean: montecarlo.mean,
            variance: montecarlo.variance,
            deviation: montecarlo.standardDeviation,
            dateNC90: montecarlo.dateNC90,
        });
};
