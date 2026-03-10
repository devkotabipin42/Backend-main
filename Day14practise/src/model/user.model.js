const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: [true, "Email is required"], unique: true},
    password: {type: String, required: [  true, "Password is required"]},
    bio: {type: String},
    profile_image: {type: String, default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"}
})


const userModel = mongoose.model('User', userSchema)

module.exports = userModel