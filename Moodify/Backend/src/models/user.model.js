const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "User already exist with this username"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "User already exist with this email"]
    },
    password: {
        type: String,
        required: true,
        select:false
    },
}, { timestamps: true })

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;