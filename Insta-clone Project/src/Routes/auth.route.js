const express = require('express');
const authControllers = require('../controllers/auth.controller.js');


const authRouter = express.Router();

authRouter.post('/register', authControllers.registerController);

authRouter.post('/protected', authControllers.protected);

authRouter.post('/login', authControllers.loginController)


module.exports = authRouter;