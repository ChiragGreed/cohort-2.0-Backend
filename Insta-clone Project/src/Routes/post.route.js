const express = require('express');
const postController = require('postController');
const postRoute =  express.Router();

postRoute.post('/posts',postController.createController)


module.exports = postRouter;