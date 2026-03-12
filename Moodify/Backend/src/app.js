const express = require('express');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const songRoute = require('./routes/songRoute');
const wildCardRoute = require('./routes/wildCardRoute');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "../", "/public/dist")));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use('/api/auth/', authRoute)
app.use('/api/songs', songRoute)
app.use('/', wildCardRoute)

module.exports = app;