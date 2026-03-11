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
        email:user.email
    },process.env.JWT_SECRET,{
        expiresIn:'1d'
    })

    res.cookie(token,'token')
}




module.exports = {registerController}