const jwt = require('jsonwebtoken')
const blackListModel=require('../module/blacklist.model')
const redis=require('../config/cache')

async function authUser(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message:"token not provided"
    })
  }
  const isTokenBlackListed = await redis.get(token)

  if(isTokenBlackListed){
    return res.status(401).json({
      message:"invalid token"
    })
  }
  let decoded;
  try{
    decoded =jwt.verify(
    token,process.env.JWT_SECRET
  )
  req.user=decoded
  next()
  }catch(err){
    return res.status(401).json({
      message:"invalid token"
    })
  }
  
}
module.exports=authUser