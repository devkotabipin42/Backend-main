const postModel= require("../model/post.model")
const jwt = require('jsonwebtoken')
const ImageKit  = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')

const Imagekit = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
})


async function postController(req,res){
  const file = await Imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:'Test',
    folder:"full-insta"
  })

  const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
  })

  res.status(201).json({
    messge:'Post created sucessfully',post
  })
}

async function getPostConnection(req,res){
  const userId = req.user.id
  const posts = await postModel.find({
    user:userId
  })
  res.status(200).json({
    message:"Post fetched sucessfully",posts
  })
}

async function getPostDetailsController(req,res){
  const userId= req.user.id
  const postId= req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"Page not found"
    })
  }

  const isValidUser = post.user.toString()===userId
  if(!isValidUser){
    return res.status(403).json({
      message:"forbidden Content"
    })
  }

  res.status(200).json({
    message:"Post fetch sucessfully",post
  })
}

async function getLikeController(req,res){
  const username = req.user.username
  const postId = req.params.postId
  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:'post not found'
    })
  }

  const like = await likeModel.create({
    post:postId,
    user:username
  })
  res.status(200).json({
    message:'post liked sucessfuly',like
  })
}

module.exports={postController,getPostConnection,getPostDetailsController,getLikeController}