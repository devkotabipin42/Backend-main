require('dotenv').config()
const app =require('./src/app')


const ConnectTODb=require('./src/config/database')
ConnectTODb()


app.listen(3000,()=>{
  console.log('server is running on port 3000');
  
})