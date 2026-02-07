const express = require('express');
const userModel = require('../models/user.model.js');
const JWT = require('jsonwebtoken');
const authRouter = express.Router();
const crypto = require('crypto');

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existing_user = await userModel.findOne({ email });

    if (existing_user) return res.status(409).json({ message: "This email user already exist!" });

    const hash = crypto.createHash('md5').update(password).digest('hex');

    const user = await userModel.create({ username, email, password:hash });

    const token = JWT.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "User registered",
        user
    })
})

authRouter.post('/protected',(req,res)=>{
    console.log(req.cookies);
    res.status(201).json({
        message:"This is protected"
    })

})

authRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    
    const user = await userModel.findOne({email});

    if(!user) return res.status(404).json({
        message:"No registered email found"
    })

    const hash = crypto.createHash('md5').update(password).digest('hex');
    
    const userPasswordCheck = user.password === hash;

    if(!userPasswordCheck) return res.status(401).json({
        message:"Wrong password"
    })
    
    

    const token = JWT.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "User Loged in",
        user
    })
})

module.exports = authRouter;