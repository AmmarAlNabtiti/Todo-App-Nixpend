const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The task must has a title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    subtasks: [
        {
            title: {
                type: String,
                trim: true,
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    status: {
        type: String,
        enum: {
            values: ['todo', 'inprogress', 'done'],
            message: 'Todo status must be of of this types [todo,inprogress,done]'
        },
        default: 'todo',
    },
}, {
    timestamps: true
});

// Exclude a V field form be shown to end user
taskSchema.pre(/^find/, function (next) {
    this.select('-__v');
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


