const postModel = require('../models/post.model.js');
const userModel = require('../models/user.model.js');


async function createController(req, res) {
    const { caption, content,userid } = req.body;

    const user = userModel.findOne({userid});

    if(!user) return res.status(404).json({message:"User id required"});
    
    const post = await postModel.create();
}

module.exports = {postController}