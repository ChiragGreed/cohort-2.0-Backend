const express = require('express');
const multer = require('multer');
const postController = require('../controllers/post.controller');
const postRoute =  express.Router();


const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const uploadMiddelware = upload.fields([{name:'content',maxcount:1}]);



postRoute.post('/',uploadMiddelware,postController.createController)


module.exports = postRoute;