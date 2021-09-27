const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    precedence: {
        type: Object,
    },

    distribution: {
        type: Object,
    },

    completed: {
        type: Boolean,
    },

    taskDuration: {
        type: Number,
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;
