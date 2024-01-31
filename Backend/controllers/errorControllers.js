const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// Return Development Errors
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

// Return Production Errors
const sendErrorProd = (err, req, res) => {
    // Operational, trusted error: send message to the client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Log error without exposing details
        console.error('ERROR 💥', err);

        // Send a generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again later.',
        });
    }
};



//  GLOBAL ERROR HANDLER
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }

    // In production Env
    else {
        let error = { ...err };
        error.message = err.message;

        // Invalid MongoDB Id 
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        // Duplicate unique fields
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        // schema validation error 
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(error, req, res);
    }
};