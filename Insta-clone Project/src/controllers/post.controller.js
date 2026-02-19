const postModel = require('../models/post.model.js');
const userModel = require('../models/user.model.js');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const JWT = require('jsonwebtoken');


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

    // JWT verification

    const token = req.cookies.token;

    if(!token) return res.status(401).json({
        message:"Unauthorised access"
    })

    let verifiedToken = null;

    try {
        verifiedToken = JWT.verify(token, process.env.JWT_SECRET);
    }
    catch(err) {
        return res.status(401).json({
            message: "Unauthorised Token"
        })
    }

    //

    const post = await postModel.create({
        caption: req.body.caption,
        content: file.url,
        userid: verifiedToken.id
    });

    res.status(201).json({
        message: "Post created",
        post
    })

}

async function getPosts(req, res) {

    // JWT verification

    const token = req.cookies.token;

    if(!token) return res.status(401).json({
        message:"Unauthorised access"
    })

    let verifiedToken = null;

    try {
        verifiedToken = JWT.verify(token, process.env.JWT_SECRET);
    }
    catch {
        return res.status(401).json({
            message: "Unauthorised Token"
        })
    }

    //

    const userPosts = await postModel.find({ userid: verifiedToken.id });

    if (!userPosts) return res.status(401).json({
        message: "No posts created yet"
    })

    res.status(200).json({
        message: "Posts fetched Successfully",
        userPosts
    })

}

async function postDets(req, res) {
    
    // JWT verification
    
    const token = req.cookies.token;
    
    if(!token) return res.status(401).json({
        message:"Unauthorised access"
    })
    
    let verifiedToken = null;

    verifiedToken = JWT.verify(token,process.env.JWT_SECRET);
    
    if(!verifiedToken) return res.status(401).json({
        message:"Unauthorised Token"
    })

    //
    
    const {postid} = req.params;

    const post = await postModel.findById(postid);

    if(!post) return res.status(404).json({
        message:"Post not found"
    })

    const userCheck = post.userid.toString() === verifiedToken.id;

    if(!userCheck) return res.status(403).json({
        message:"Forbidden request"
    })

    res.status(200).json({
        message:"Your Post Dets Fetched Successfully",
        post
    })

}

module.exports = { createController, getPosts, postDets };