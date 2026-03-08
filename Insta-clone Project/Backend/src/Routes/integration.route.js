const express = require('express');
const path = require('path');


const IntergationRouter = express.Router();


IntergationRouter.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '../..' ,'/Public/dist/index.html'))
})

module.exports = IntergationRouter;