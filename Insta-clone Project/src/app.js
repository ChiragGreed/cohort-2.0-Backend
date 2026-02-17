const express = require('express');
const authRoute = require('./Routes/auth.route.js');
const postRoute = require('./Routes/post.route.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);


module.exports = app;