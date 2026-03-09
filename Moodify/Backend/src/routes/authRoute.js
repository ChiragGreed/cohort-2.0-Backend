const express = require('express');
const { registerUserController, loginUserController, getMeController, logoutUserController } = require('../Controllers/auth.controller');
const validateUser = require('../middleware/authMiddleware');

const authRoute = express.Router();

authRoute.post('/register', registerUserController);
authRoute.post('/login', loginUserController);

authRoute.get('/getMe', validateUser, getMeController);
authRoute.get('/logout', validateUser, logoutUserController);

module.exports = authRoute
