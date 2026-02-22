const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const userController = require('../controllers/user.controller.js');


const userRoute = express.Router();

userRoute.post('/follow/:username',authMiddleware,userController.followUserController);
userRoute.post('/unfollow/:username',authMiddleware,userController.unfollowUserController);

userRoute.post('/likepost/:postid',authMiddleware,userController.likePost);
userRoute.post('/unlikepost/:postid',authMiddleware,userController.unlikePost);


module.exports  = userRoute;