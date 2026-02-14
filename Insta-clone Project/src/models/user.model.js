const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "username":{
        type:String,
        unique:[true,"Username already exist"],
        require:true
    },
    "email":{
        type:String,
        unique:[true,"User already exist with this email"],
        require:true
        },
    "password":{
        type:String,
        require:true
    },
    "bio":String,
    "profile_image":{
        type:String,
        default:'https://ik.imagekit.io/lfqmv9rcq/default_pfp.avif'
    }
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;