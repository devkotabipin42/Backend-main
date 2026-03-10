const mongoose = require('mongoose')

async function ConnectTODb (){
 await mongoose.connect(process.env.MONGO_URI)
 console.log('connected to mongoose db');
 
}

module.exports=ConnectTODb