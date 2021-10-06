const montecarloRouter = require('express').Router();

const montecarloContoller = require('../controllers/montecarlo/montecarlo.controller');

// montecarloRouter.get('/simulate', montecarloContoller.simulate);
montecarloRouter.post('/simulate', montecarloContoller.simulate);

module.exports = montecarloRouter;
