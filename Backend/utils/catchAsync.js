const catchAsync = (fn) => {
    return (req, res, next) => {
        // Ensure fn returns a promise by wrapping it with Promise.resolve
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = catchAsync;