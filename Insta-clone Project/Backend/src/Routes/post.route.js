const express = require('express');
const multer = require('multer');
const postController = require('../controllers/post.controller');
const postRoute =  express.Router();
const VerifyUser = require('../middlewares/auth.middleware.js');
const verifyUser = require('../middlewares/auth.middleware.js');



const upload = multer({storage:multer.memoryStorage()});
const uploadMiddelware = upload.fields([{name:'content',maxcount:1}]);



postRoute.post('/',uploadMiddelware,VerifyUser,postController.createController);

postRoute.get('/userPosts',VerifyUser,postController.getPostsController);

postRoute.get('/postDets/:postid',VerifyUser,postController.postDetsController);

postRoute.get('/feed',verifyUser,postController.feedController);


module.exports = postRoute;