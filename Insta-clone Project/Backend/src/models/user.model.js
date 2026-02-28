const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "username": {
        type: String,
        unique: [true, "Username already exist"],
        required: true
    },
    "email": {
        type: String,
        unique: [true, "User already exist with this email"],
        required: true
    },
    "password": {
        type: String,
        required: true,
        select: false
    },
    "bio": String,
    "profile_image": {
        type: String,
        default: 'https://ik.imagekit.io/lfqmv9rcq/default_pfp.jpg'
    },
    "requests": {
        type: [String],
        default: [],
    }
})

userSchema.index({ requests: 1 }, { unique: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;