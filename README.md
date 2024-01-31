# Todo Management App

This project is a todo management application built using Angular for the frontend, Node.js with Express for the backend, and MongoDB for data storage. It allows users to manage their tasks with titles, descriptions, subtasks, and status tracking.

## Features

- **Task Management**: Organize tasks into three categories - To-do, Doing, and Done.
- **Add New Tasks**: Users can add new tasks with details such as title, description, subtasks, progress bar, and status.
- **Edit Tasks**: Users can edit existing tasks to update their details.
- **Progress Tracking**: Visualize progress using charts.
- **Backend API**: Utilizes Node.js and Express to provide a RESTful API for managing tasks.
- **Database Integration**: MongoDB is used as the database to store task data.

## Requirements

- HTML, CSS, JavaScript
- TypeScript
- Angular
- MongoDB
- NodeJS with Express
- Chart.js
- Git

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or using MongoDB Atlas

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AmmarAlNabtiti/Todo-App-Nixpend.git
   ```

2. **Install dependencies**:

   - Backend:

     ```bash
     cd backend
     npm install
     ```

   - Frontend:

     ```bash
     cd frontend
     npm install
     ```

3. **Configure environment variables**:

   - Create a `.env` file in the `backend` directory and define the following variables:

     ```
     NODE_ENV=development
     PORT=3000

     DB_USERNAME=naptete
     DB_PASSWORD=YK7I1ZQOpNRNFAAq
     DB_URL=mongodb+srv://naptete:<password>@booking-hotel.h4j4dew.mongodb.net/?retryWrites=true&w=majority


     ```

4. **Start the servers**:

   - Backend:

     ```bash
     cd backend
     npm start
     ```

   - Frontend:

     ```bash
     cd frontend
     npm start
     ```

5. **Access the application**:

   Open your web browser and go to `http://localhost:4200` to access the application.

## Backend Package JSON

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "A simple Todo app API built with Node.js, Express, and Mongoose. Allows creating, updating, and managing tasks with titles, descriptions, subtasks, and status (todo, inProgress, done).",
  "main": "app.js",
  "scripts": {
    "start": "node ./server.js",
    "start:dev": "nodemon ./server.js",
    "start:prod": "set NODE_ENV=production && nodemon ./server.js"
  },
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-import": "^2.17.2",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-react": "^7.12.4",
    "prettier": "^1.17.0"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "author": "Ammar Al Nabtiti",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.1.0",
    "morgan": "^1.10.0"
  }
}
```

## Frontend Package JSON

```json
{
  "name": "todo-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "chart.js": "^4.4.1",
    "ng2-charts": "^5.0.4",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.10",
    "@angular/cli": "^17.0.10",
    "@angular/compiler-cli": "^17.0.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.2.2"
  }
}
```

## Author

- **Ammar Al Nabtiti**

## License

This project is licensed under the ISC License.
