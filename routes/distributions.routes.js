const distributionRouter = require('express').Router();

const uniformController = require('../controllers/distributions/uniform.controller');
const normalContoller = require('../controllers/distributions/normal.controller');
const exponentialContoller = require('../controllers/distributions/exponential.controller');

distributionRouter.post('/normal', normalContoller.generateValues);

distributionRouter.post('/exponential', exponentialContoller.generateValues);

distributionRouter.post('/uniform', uniformController.generateValues);

module.exports = distributionRouter;