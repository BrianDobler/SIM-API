import { montecarloContoller } from '../controllers/montecarlo/montecarlo.controller';

const montecarloRouter = require('express').Router();

montecarloRouter.post('/simulate', montecarloContoller.simulate);

module.exports = montecarloRouter;
