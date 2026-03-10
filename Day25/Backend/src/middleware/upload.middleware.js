const multer = require('multer')

const stroage = multer.memoryStorage()

const upload = multer({
  storage:stroage,
   limits:{
    fileSize:1024*1024*12
   }
})

module.exports=upload