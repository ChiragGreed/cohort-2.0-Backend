const express = require('express');
const authControllers = require('../controllers/auth.controller.js');


const authRouter = express.Router();

authRouter.post('/register', authControllers.register);

authRouter.post('/login', authControllers.login);

authRouter.get('/protected', authControllers.protected);


module.exports = authRouter;