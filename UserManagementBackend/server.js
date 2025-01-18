const bodyParser = require('body-parser');
require('dotenv').config();
const connectionDb = require('./dbConnection/connection');
const cors = require('cors');
const userRoute = require('./route/userRoute');
const taskRoute = require('./route/taskRoute');
const PORT = process.env.port;
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/', userRoute);
app.use('/', taskRoute);
// let host = "localhost";


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});