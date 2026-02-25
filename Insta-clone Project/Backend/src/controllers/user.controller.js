const userModel = require('../models/user.model.js');
const followModel = require('../models/follow.model.js');
const postModel = require('../models/post.model.js');
const likeModel = require('../models/like.model.js');



async function followUserController(req, res) {

    const username = req.user.username;
    const followeeUsername = req.params.username;

    const followeeExist = await userModel.findOne({ username: followeeUsername });

    if (!followeeExist) return res.status(200).json({
        message: "User not exist"
    })

    const followAlreadyExist = await followModel.findOne({
        follower: username,
        followee: followeeUsername
    });

    if (followAlreadyExist) return res.status(400).json({
        message: "Already followed"
    })

    if (username === followeeUsername) return res.status(400).json({
        mesaage: "Can not follow yourself"
    })

    const requests = [...followeeExist.requests];

    const requestAlreadyExist = requests.includes(username);

    if (requestAlreadyExist) return res.status(422).json({
        message: "Follow request already sent"
    })

    requests.push(username);

    await userModel.findByIdAndUpdate(followeeExist._id, { requests: requests });

    res.status(200).json({
        message: "Follow request sent"
    })
}

async function RequestController(req, res) {
    const user = await userModel.findById(req.user.id);
    const username = user.username;

    const requests = [...user.requests];
    const requesterUsername = req.params.requester;
    const requesteExist = requests.includes(requesterUsername);

    if (!requesteExist) return res.status(404).json({
        message: `Request from ${requesterUsername} not found`
    })

    const requesterIndex = requests.indexOf(requesterUsername);


    requests.splice(requesterIndex, 1);


    await userModel.findByIdAndUpdate(req.user.id, { requests: requests });

    const UserResponse = req.body.response;
    if (UserResponse === "rejected") {
        return res.status(200).json({
            message: "Follow request was rejected"
        })
    }

    const follow = await followModel.create({
        follower: requesterUsername,
        followee: username,
        status: UserResponse
    })

    res.status(201).json({
        message: "Follow request accepted",
        follow
    })

}

async function unfollowUserController(req, res) {
    const username = req.user.username;
    const followeeUsername = req.params.username;

    const followeeExist = await userModel.findOne({ username: followeeUsername });

    if (!followeeExist) return res.status(400).json({
        message: "User does not exist"
    })

    const followRecord = await followModel.findOne({
        follower: username,
        followee: followeeUsername
    })

    if (!followRecord) return res.status(404).json({
        message: "Already unfollwed"
    })


    await followModel.findByIdAndDelete(followRecord._id);

    res.status(200).json({
        message: `Unfollowed ${followeeUsername}`
    })
}

async function likePost(req, res) {

    const username = req.user.username;
    const { postid } = req.params;

    const postExist = await postModel.findById(postid);

    if (!postExist) return res.status(404).json({
        message: "Post does not exist"
    })

    const likeExist = await likeModel.findOne({ post: postid, user: username });

    if (likeExist) return res.status(200).json({
        message: "Already liked"
    })

    const like = await likeModel.create({ post: postid, user: username });


    res.status(201).json({
        message: `Liked post with id: ${postid}`,
        like
    })

}

async function unlikePost(req, res) {
    const username = req.user.username;
    const postid = req.params.postid;

    const postExist = await postModel.findOne({ _id: postid });

    if (!postExist) return res.status(404).json({
        message: "Post does not exist"
    })

    const likePostRecord = await likeModel.findOne({ post: postid, user: username });

    if (!likePostRecord) return res.status(400).json({
        message: "Post already unliked"
    })

    const unlike = await likeModel.findByIdAndDelete(likePostRecord);

    res.status(202).json({
        message: "Post unliked",
        unlike
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    likePost,
    unlikePost,
    RequestController
}