const authModel = require('../model/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
async function registerController(req,res){
    const {username,email,password}= req.body

    isUserExist = await authModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserExist){
        return res.status(400).json({
            message:'User with this email or username already exists'
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await authModel.create({
        username,email,password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email,
        role: user.role
    },process.env.JWT_SECRET,{
        expiresIn:'1d'
    })

    res.cookie('token',token)
    res.status(201).json({
        message:'User registered successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
        token
    })
}

async function loginController(req,res){
    const {username,email,password} = req.body

    const user = await authModel.findOne({
        $or:[
            {email},
            {username}
        ]   
    })

    if(!user){
        return res.status(400).json({
            message:'Invalid email or username'
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:'Invalid password'
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email,
        role: user.role
    },process.env.JWT_SECRET,{
        expiresIn:'1d'
    })

    res.cookie('token',token)
    res.status(200).json({
        message:'User logged in successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
       
    })
}

async function profileController(req,res){
    res.status(200).json({
        message:'User profile',
        user:req.user
    })
}


module.exports = {registerController, loginController, profileController}