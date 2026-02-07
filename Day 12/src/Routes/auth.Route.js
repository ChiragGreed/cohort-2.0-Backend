const express = require('express');
const userModel = require('../Models/user.model.js');
const JWT = require('jsonwebtoken');
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existing_user = await userModel.findOne({ email });

    if (existing_user) return res.status(401).json({ message: "user with this email already exist" });

    const user = await userModel.create({ username, email, password });

    const token = JWT.sign({
        id: user._id,
        email: user.email,
    },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token);

    res.status(201).json({
        message: "User Registered",
        user
    })
}
)

module.exports = authRouter;