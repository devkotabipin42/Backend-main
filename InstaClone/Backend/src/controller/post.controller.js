const postModel=require('../model/post.model')
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const likeModel = require('../model/like.model')
const  Imagekit= new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function postCollection(req,res){
  const file = await Imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:'Test',
    folder:'insta-clone'
  })

  const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
  })

  res.status(201).json({
    message:"Post created sucessfully",post
  })
  
}

async function getPostController(req,res){

  const userId = req.user.id
  const posts = await postModel.find({
    user:userId
  })

  res.status(200).json({
    message:"Posts fetched sucessfully",posts
  })

}

async function getPostDetailsController(req,res){
  const userId = req.user.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"Post not found "
    })
  }

  const isValidUser = post.user.toString()===userId

  if(!isValidUser){
    return res.status(403).json({
      message:"Forbidden Content"
    })
  }

  res.status(200).json({
    message:"Post fetched sucessfully",post
  })
}

async function getLikeDetailsController(req,res){
  const username = req.user.username
  const postId= req.params.postId

  const post = await postModel.findById(postId)

  if(post ){
    return res.status(404).json({
      message:"Post not found"
    })
  }

  const like = await likeModel.create({
    post:postId,
    user:username
  })
  res.status(200).json({
    message:"post liked sucessfully",like
  })
}

module.exports={postCollection,getPostController,getPostDetailsController,getLikeDetailsController}