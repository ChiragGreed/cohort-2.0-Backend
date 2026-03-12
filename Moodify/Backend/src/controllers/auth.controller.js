const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const blacklistModel = require("../models/blacklist.model");
const redis = require('../config/cache');

async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    const userExist = await userModel.findOne({ $or: [{ username }, { email }] })

    if (userExist) return res.status(400).json({
        message: "Account already exist with this " + (userExist.username === username ? "username" : "email")
    })

    const hash = await bcrypt.hash(password, 10);


    const user = await userModel.create({ username, email, password: hash });

    const token = JWT.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token);

    res.status(201).json({
        message: "User Registered",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

async function loginUserController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ $or: [{ username }, { email }] }).select('+password');

    if (!user) return res.status(400).json({
        message: "Invalid credentials"
    })

    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) return res.status(400).json({
        message: "Invalid credentials"
    })

    const token = JWT.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET
    )

    res.cookie('token', token);

    res.status(200).json({
        message: "User Logged In",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user);

    return res.status(200).json({
        message: "User fetched",
        user
    })
}

async function logoutUserController(req, res) {
    const { token } = req.cookies;

    if (!token) return res.status(400).json({
        message: "Token not found"
    })

    res.clearCookie('token');

    await redis.set(token, Date.now().toString(), "EX", 60 * 60);

    res.status(200).json({
        message: "User Logged out"
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    getMeController,
    logoutUserController
}