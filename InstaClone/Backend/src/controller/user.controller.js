const followModel=require('../model/follow.model')
const userModel = require('../model/user.model')

async function followUserCollection(req,res){
  const followerUsername = req.user.username
  const followeeUsername = req.params.username


  if(followerUsername===followeeUsername){
    return res.status(400).json({
      message:'you cannot follow yourself'
    })
  }

  const isFolloweeExists = await userModel.findOne({
    username:followeeUsername
  })
  if(!isFolloweeExists){
    return res.status(404).json({
      message:"user you are trying to follow doesnot exists"
    })
  }
  const isAlreadyFollowing = await followModel.findOne({
    followers :followerUsername,
    followee:followeeUsername
  })
  if(isAlreadyFollowing){
    return res.status(200).json({
      message:`you are already following ${followeeUsername}`,
      follow:isAlreadyFollowing
    })
  }

  const followRecord = await followModel.create({
    followers:followerUsername,
    followee:followeeUsername
  })
  res.status(201).json({
    message:`you are now following ${followeeUsername}`,
    folllow:followRecord
  })
}

async function unfollowUserController(req,res){
  const followerUsername=req.user.username
  const followeeUsername=req.params.username
  
  const isUserFollowing= await followModel.findOne({
    followee:followeeUsername,
    followers:followerUsername,
  })
  if(!isUserFollowing){
    return res.status(200).json({
      message:`You are not following ${followeeUsername}`
    })
  }
  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message:`You have unfollowed ${followeeUsername}`
  })
  
}


module.exports={followUserCollection,unfollowUserController}
