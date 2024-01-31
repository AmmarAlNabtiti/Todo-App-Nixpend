const dotenv = require('dotenv');
const mongoose = require('mongoose');

//ENVIRONMENT VARIABLES
dotenv.config({ path: './config.env' });

// uncaughtException
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

// DB CONNECTION
const DB_URL = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB_URL).then(() => {
    console.log(`The database connection successfully`);
});


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`The app is listening on PORT: ${PORT}`);
    console.log(`The current environment is ${process.env.NODE_ENV} `);
});

//unhandledRejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});