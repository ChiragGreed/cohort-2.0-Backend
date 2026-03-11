const mongoose = require('mongoose');

const songSchema= mongoose.Schema({
    songUrl:{
        type:String,
        required:true
    },
    coverUrl:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:['sad','happy','angry','neutral','surprised'],
            message:"enum values"
        }
    }

})
const songModel = mongoose.model('songs',songSchema);

module.exports = songModel;