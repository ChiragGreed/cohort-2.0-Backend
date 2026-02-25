const mongoose = require('mongoose');

const postSchema =  new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    content:{
        type:String,
        require:[true,"Please upload some kind of content for posting"],
    },
    userid:{
        ref:'users',
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required"]
    }
})

const postModel = mongoose.model('posts',postSchema);


module.exports = postModel;
            