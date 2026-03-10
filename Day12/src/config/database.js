const mongoose = require('mongoose')

function ConnectDb(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log('connect to Db');
    
  })
}

module.exports= ConnectDb