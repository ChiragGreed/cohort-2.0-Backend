const express = require('express');
const { songController, getSongController } = require('../controllers/song.controller');
const upload = require('../middleware/fileUploadMiddleware');


const songRoute = express.Router();

songRoute.post('/upload', upload.single('song'), songController);

songRoute.get('/get', getSongController);



module.exports = songRoute