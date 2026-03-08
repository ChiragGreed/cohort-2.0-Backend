const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

// Require routes
const authRoute = require('./Routes/auth.route.js');
const postRoute = require('./Routes/post.route.js');
const userRoute = require('./Routes/user.route.js');
const IntegrationRouter = require('./Routes/integration.route.js');


app.use(express.static(path.join(__dirname, '../Public/dist')));


// Using routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/user', userRoute);
app.use('/',IntegrationRouter);



module.exports = app;