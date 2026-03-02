const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const userController = require('../controllers/user.controller.js');


const userRoute = express.Router();

userRoute.get('/otherUsers',authMiddleware,userController.otherUsersController);

userRoute.post('/follow/requests/:requester',authMiddleware,userController.RequestController);

userRoute.post('/follow/:username',authMiddleware,userController.followUserController);
userRoute.post('/unfollow/:username',authMiddleware,userController.unfollowUserController);
userRoute.get('/getfollowers',authMiddleware,userController.getfollowersController);
userRoute.get('/getfollowing',authMiddleware,userController.getfollowingController);

userRoute.post('/addLike/:postid',authMiddleware,userController.likePost);
userRoute.post('/removeLike/:postid',authMiddleware,userController.unlikePost);


module.exports  = userRoute;