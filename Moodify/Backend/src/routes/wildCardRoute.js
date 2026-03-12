const express = require('express');
const wildCardController = require('../controllers/wildCard.controller');

const wildCardRoute = express.Router();

wildCardRoute.get('*name', wildCardController );


module.exports = wildCardRoute