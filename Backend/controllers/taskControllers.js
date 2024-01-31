const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


// action ==> get all TASKS
// routes ==> GET /api/v1/tasks
// access ==> PUBLIC
exports.getAllTasks = catchAsync(async (req, res, next) => {
    // Filters
    const query = req.query || {};
    const tasks = await Task.find(query);

    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            tasks
        }
    });
});

// action ==> get specific TASK
// routes ==> GET /api/v1/tasks
// access ==> PUBLIC
exports.getTask = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) return next(new AppError(`The Id ${taskId} you provide does not exist`, 404));

    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });
});

// action ==> Create New TASK
// routes ==> POST /api/v1/tasks
// access ==> PUBLIC
exports.createTask = catchAsync(async (req, res, next) => {
    const { title, description, subtasks, status } = req.body;
    const task = await Task.create({ title, description, subtasks, status });

    res.status(201).json({
        status: 'success',
        data: {
            task
        }
    });
});

// action ==> Update TASK
// routes ==> PATCH /api/v1/tasks
// access ==> PUBLIC
exports.updateTask = catchAsync(async (req, res, next) => {

    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true, runValidators: true });

    if (!task) return next(new AppError(`The Id ${req.params.taskId} you provide does not exist`, 404));

    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });
});

// action ==> Delete TASK
// routes ==> DELETE /api/v1/tasks
// access ==> PUBLIC
exports.deleteTask = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return next(new AppError(`The Id ${req.params.taskId} you provide does not exist`, 404));

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// action ==> Delete All TASKS
// routes ==> DELETE /api/v1/tasks
// access ==> PUBLIC
exports.deleteAllTasks = catchAsync(async (req, res, next) => {
    await Task.deleteMany();

    res.status(204).json({
        status: 'success',
        data: null
    });
});