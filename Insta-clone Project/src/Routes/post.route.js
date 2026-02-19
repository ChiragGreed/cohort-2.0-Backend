const express = require('express');
const multer = require('multer');
const postController = require('../controllers/post.controller');
const postRoute =  express.Router();



const upload = multer({storage:multer.memoryStorage()});
const uploadMiddelware = upload.fields([{name:'content',maxcount:1}]);



postRoute.post('/',uploadMiddelware,postController.createController);

postRoute.get('/userPosts',postController.getPosts);

postRoute.get('/postDets/:postid',postController.postDets);



module.exports = postRoute;