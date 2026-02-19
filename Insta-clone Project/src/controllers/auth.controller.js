const userModel = require('../models/user.model.js');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerController(req, res) {
    const { username, email, password, bio, profile_image } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ $or: [{ username }, { email }] });

    if (isUserAlreadyExist) return res.status(409).json({
        message: "User already exist " + (isUserAlreadyExist.email == email ?
            "with this email" : "with this username")
    })

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ username, email, password: hash, bio, profile_image });

    const token = JWT.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token);

    res.status(201).json({
        message: "User Registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })


}

async function protected(req, res) {
    
    const token = await req.cookies.token;

    const tokenCheck = JWT.verify(token, process.env.JWT_SECRET);
    
    res.send(tokenCheck);
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ $or: [{ username }, { email }] });

    if (!user) return res.status(400).json({
        message: "User do not exist"
    })

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(401).json({
        message: "Wrong password"
    })

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token);

    res.status(200).json({
        message: "User Logged in",
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            bio: user.bio,
        }
    })



}

module.exports = {
    registerController,
    loginController,
    protected
}