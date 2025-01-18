const express = require('express');
const route = express.Router();

const controller = require('../controller/userController');

route.post('/register', controller.registerUser);
route.post('/login', controller.loginUser);


module.exports = route;