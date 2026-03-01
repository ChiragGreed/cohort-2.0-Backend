const postModel = require('../models/post.model.js');
const userModel = require('../models/user.model.js');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createController(req, res) {

    // Uploading on imagekit

    const fileName = req.files.content[0].originalname;
    const buffer = req.files.content[0].buffer;

    const file = await client.files.upload({
        file: await toFile(Buffer.from(buffer), 'file'),
        fileName: fileName,
        folder: 'Insta-clone-Posts'
    });

    //

    const post = await postModel.create({
        caption: req.body.caption,
        content: file.url,
        userid: req.user.id
    });

    res.status(201).json({
        message: "Post created",
        post
    })

}

async function getPostsController(req, res) {

    const userPosts = await postModel.find({ userid: req.user.id });

    if (!userPosts) return res.status(401).json({
        message: "No posts created yet"
    })

    res.status(200).json({
        message: "Posts fetched Successfully",
        userPosts
    })

}

async function postDetsController(req, res) {

    const { postid } = req.params;

    const post = await postModel.findById(postid);

    if (!post) return res.status(404).json({
        message: "Post not found"
    })

    const userCheck = post.userid.toString() === req.user.id;

    if (!userCheck) return res.status(403).json({
        message: "Forbidden request"
    })

    res.status(200).json({
        message: "Your Post Dets Fetched Successfully",
        post
    })

}

async function feedController(req, res) {
    const feed = await postModel.find().populate('userid');
    res.status(200).json({
        message: "Post fetched successfully",
        feed
    })

}

module.exports = { createController, getPostsController, postDetsController, feedController };