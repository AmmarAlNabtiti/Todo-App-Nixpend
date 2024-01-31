const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const TaskRoutes = require('./routes/TaskRoutes');
const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./controllers/errorControllers');

const app = express();

// BODY PARSER
app.use(express.json());

// Add this line to enable CORS for all routes
app.use(cors());

// LOGGER MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

// ROUTES MOUNTS
app.use('/api/v1/tasks', TaskRoutes);

// Handel unavailable routes matching
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR handler
app.use(GlobalErrorHandler);

module.exports = app;

