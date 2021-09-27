const { Schema, model } = require('mongoose');
const Task = require('./Task');

const montecarloLineSchema = new Schema({
    taskA1: {
        type: Task,
    },

    taskA2: {
        type: Task,
    },

    taskA3: {
        type: Task,
    },

    taskA4: {
        type: Task,
    },

    taskA5: {
        type: Task,
    },

});

const MontecarloLine = model('MontecarloLine', montecarloLineSchema);

module.exports = MontecarloLine;
