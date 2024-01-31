const express = require('express');

const TaskRoutes = express.Router();
const { createTask, getTask, updateTask, getAllTasks, deleteAllTasks, deleteTask } = require('../controllers/taskControllers');

TaskRoutes
    .route('/')
    .get(getAllTasks)
    .post(createTask)
    .delete(deleteAllTasks);

TaskRoutes
    .route('/:taskId')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);


module.exports = TaskRoutes;