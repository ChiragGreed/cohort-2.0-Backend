const mongoose = require('mongoose');
require('dotenv').config();

function ConnectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected");
        })
}

module.exports = ConnectToDb;