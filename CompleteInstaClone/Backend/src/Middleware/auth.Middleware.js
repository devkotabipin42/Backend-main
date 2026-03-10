const jwt = require("jsonwebtoken")

async function Identifyer(req,res,next){
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message:"token not provided user not authorized"
    })
  }

  let decoded = null

  try{
    decoded = jwt.verify(token,process.env.JWT_SECRET)
  }catch (err){
    return res.status(401).json({
      message:"user not authorized"
    })
  }
  
  req.user=decoded
  next()
}

module.exports=Identifyer