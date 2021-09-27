const distributionRouter = require('express').Router();

const uniformController = require('../controllers/distributions/uniform.controller');
const normalContoller = require('../controllers/distributions/normal.controller');
const exponentialContoller = require('../controllers/distributions/exponential.controller');

distributionRouter.get('/normal', normalContoller.generateValues);
distributionRouter.get('/exponential', exponentialContoller.generateValues);
distributionRouter.get('/uniform', uniformController.generateValues);

module.exports = distributionRouter;
