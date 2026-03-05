const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester:{
        type:String,
        required:true,
        ref:'users'
    },
    requestee:{
        type:String,
        required:true,
        ref:'users'
    }
    
},{timestamps:true})


const requestModel = mongoose.model('requestes',requestSchema);

module.exports = requestModel;