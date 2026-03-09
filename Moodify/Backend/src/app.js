const express = require('express');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:6010'
}));

app.use('/api/auth/', authRoute)

module.exports = app;