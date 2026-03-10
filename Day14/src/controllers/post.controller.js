const postModel = require('../model/post.model')
const Imagekit= require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
console.log(process.env.IMAGEKIT_PRIVATE_KEY)

const imagekit = new Imagekit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
  console.log(req.body,req.file);
  const file = await imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:'Test'
  })

  res.send(file)
  
}

module.exports={
  createPostController
}