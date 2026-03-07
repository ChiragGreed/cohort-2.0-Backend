const userModel = require('../models/user.model.js');
const followModel = require('../models/follow.model.js');
const postModel = require('../models/post.model.js');
const likeModel = require('../models/like.model.js');
const requestModel = require('../models/request.model.js');


async function otherUsers(req, res) {
    const user = req.user.username;

    const otherUsers = await userModel.find({ username: { $ne: user } });

    res.status(200).json({
        message: "Fetched other users",
        otherUsers
    })
}

async function followUserRequest(req, res) {

    const username = req.user.username;
    const followeeUsername = req.params.username;

    const followee = await userModel.findOne({ username: followeeUsername });

    if (!followee) return res.status(404).json({
        message: "User not exist"
    })

    const followRelation = await followModel.findOne({
        follower: username,
        followee: followeeUsername
    });

    if (followRelation) return res.status(400).json({
        message: "Already followed"
    })

    if (username === followeeUsername) return res.status(400).json({
        mesaage: "Can not follow yourself"
    })

    const requestExist = await requestModel.findOne({ requester: username, requestee: followee.username });

    if (requestExist) return res.status(400).json({
        message: "Request already sent"
    })
    const request = await requestModel.create({ requester: username, requestee: followee.username })


    res.status(200).json({
        message: "Follow request sent",
        request
    })
}

async function followUser(req, res) {

    const username = req.user.username;
    const followeeUsername = req.params.username;

    const followee = await userModel.findOne({ username: followeeUsername });

    if (!followee) return res.status(404).json({
        message: "User not exist"
    })

    const followRelation = await followModel.findOne({
        follower: username,
        followee: followeeUsername
    });

    if (followRelation) return res.status(400).json({
        message: "Already followed"
    })

    if (username === followeeUsername) return res.status(400).json({
        mesaage: "Can not follow yourself"
    })

    try {
        const request = await requestModel.findOneAndDelete({ requester: username, requestee: followeeUsername });
    }
    catch (err) {

    }

    await followModel.create({ follower: username, followee: followee.username })

    res.status(200).json({
        message: `Followed ${followeeUsername}`,
    })
}

async function getRequests(req, res) {

    const user = req.user.username;

    const requestDocs = await requestModel.find({ requestee: user });

    if (!requestDocs) return res.status(400).json({
        message: "No follow requests"
    })

    const requests = await Promise.all(requestDocs.map(async (doc) => {
        const requester = await userModel.findOne({ username: doc.requester })
        return requester;
    }))

    res.status(200).json({
        message: "Fetched all follow requestes",
        requests
    })

}

async function getSentRequests(req, res) {

    const user = req.user.username;

    const requestDocs = await requestModel.find({ requester: user });

    if (!requestDocs) return res.status(400).json({
        message: "No follow requests"
    })

    const requests = await Promise.all(requestDocs.map(async (doc) => {
        const requester = await userModel.findOne({ username: doc.requestee })
        return requester;
    }))

    res.status(200).json({
        message: "Fetched all follow requestes sent",
        requests
    })

}

async function acceptRequest(req, res) {
    const user = req.user.username;
    const { requester } = req.params;

    const requestExist = await requestModel.findOne({ requester, requestee: user });

    if (!requestExist) return res.status(404).json({
        message: `Request not found from ${requester}`
    })

    await requestModel.findOneAndDelete({ requester, requestee: user });


    const follow = await followModel.create({ follower: requester, followee: user });
    await followModel.findByIdAndUpdate(follow._id, { status: 'accepted' });

    res.status(201).json({
        message: "Follow request accepted",
        follow
    })

}

async function rejectRequest(req, res) {
    const user = req.user.username;
    const { requester } = req.params;

    const requestExist = await requestModel.findOne({ requester, requestee: user });

    if (!requestExist) return res.status(404).json({
        message: `Request not found from ${requester}`
    })

    await requestModel.findOneAndDelete({ requester, requestee: user });

    res.status(200).json({
        message: "Follow request rejected",
    })

}

async function unfollowUser(req, res) {
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

async function getfollowers(req, res) {
    const user = req.user.username;

    const followRelation = await followModel.find({ followee: user });

    if (followRelation.length === 0) {
        return res.status(204).json({
            message: `No followers found for ${user}`
        });
    }

    const followers = await Promise.all(
        followRelation.map(async (doc) => {
            return await userModel.findOne({ username: doc.follower });
        })
    );

    res.status(200).json({
        message: `Followers of ${user} fetched`,
        followers
    });
}

async function getfollowing(req, res) {
    const user = req.user.username;

    const followRelation = await followModel.find({ follower: user });

    if (followRelation.length === 0) {
        return res.status(404).json({
            message: `No followings for ${user}`
        });
    }

    const followings = await Promise.all(
        followRelation.map(async (doc) => {
            return await userModel.findOne({ username: doc.followee });
        })
    );

    res.status(200).json({
        message: `Followings of ${user} fetched`,
        followings
    });
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
    otherUsers,
    followUserRequest,
    followUser,
    unfollowUser,
    getfollowers,
    getfollowing,
    likePost,
    unlikePost,
    getRequests,
    getSentRequests,
    rejectRequest,
    acceptRequest
}