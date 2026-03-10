require('dotenv').config()
const connectToDo = require('./config/database')
const app = require('./src/app')


connectToDo()

app.listen(3000,()=>{
  console.log('server is running');
  
})