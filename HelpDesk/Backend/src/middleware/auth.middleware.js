const jwt = require('jsonwebtoken')


function authMiddleware(req,res,next){
    const token = req.cookies.token|| 
                req.headers['authorization']?.split(' ')[1]

    if(!token){
        return res.status(401).json({
            message:'Unauthorized',
            sucess:false,
            err:"No token provided"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            message:'Unauthorized',
            sucess:false,
            err:'invalid token'
        })
    }
}

module.exports=authMiddleware