const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const userController = require('../controllers/user.controller.js');


const userRoute = express.Router();


userRoute.get('/otherUsers', authMiddleware, userController.otherUsers);

// Request
userRoute.get('/follow/getRequests', authMiddleware, userController.getRequests);
userRoute.post('/follow/acceptRequest/:requester', authMiddleware, userController.acceptRequest);
userRoute.post('/follow/rejectRequest/:requester', authMiddleware, userController.rejectRequest);

// Follow
userRoute.get('/getfollowers', authMiddleware, userController.getfollowers);
userRoute.get('/getfollowing', authMiddleware, userController.getfollowing);
userRoute.post('/follow/:username', authMiddleware, userController.followUserRequest);
userRoute.post('/unfollow/:username', authMiddleware, userController.unfollowUser);

// Like
userRoute.post('/addLike/:postid', authMiddleware, userController.likePost);
userRoute.post('/removeLike/:postid', authMiddleware, userController.unlikePost);


module.exports = userRoute;