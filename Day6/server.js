const app = require('./src/app')
const mongoose = require('mongoose')
function connectToDo(){
  mongoose.connect('mongodb+srv://sujata:mC7QqEcpAkBmn2An@cluster0.7nxs5uc.mongodb.net/day6').then(()=>{
  console.log('connected to database')
})
}
connectToDo()
app.listen(3000,()=>{
  console.log('server is running');
  
})