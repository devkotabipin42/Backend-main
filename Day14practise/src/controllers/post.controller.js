const postModel = require('../model/post.model');
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit=new ImageKit({
privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
 console.log(req.body,req.file);

 const token = req.cookies.token
 if(!token){
  return res.status(401).json({
    message:'Token not provideed,Unathorized access'
  })
 }
let decoded=null
 try{
 decoded = jwt.verify(token,process.env.JWT_SECRET)

 }catch (err){
 return res.status(401).json({
    message:"user not authorize"
  })
 }
 console.log(decoded);
 

 const file =await imagekit.files.upload({
  file:await toFile(Buffer.from(req.file.buffer),'file'),
  fileName:'Test',
  folder:'cohort-2-insta-clone-post'
 })

 const post = await postModel.create({
  caption:req.body.caption,
  imageUrl:file.url,
  user:decoded.id
 })
 res.status(201).json({
  message:"post create sucessfully",post
 })
 
}

async function getPostController(req,res){
  const token = req.cookies.token
  let decoded;
  try{
  decoded = jwt.verify(token,process.env.JWT_SECRET)

  }catch(err){
    return res.status(401).json({
      message:'Token invalid'
    })
  }
  const userId = decoded.id
  const posts = await postModel.find({
    user:userId
  })

  res.status(201).json({
    message:'Posts fetch sucessfully ',posts
  })
}

module.exports={ createPostController ,getPostController};