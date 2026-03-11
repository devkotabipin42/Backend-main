const mongoose = require('mongoose');

const tiketSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['open','in progress','closed'],
        default:'open'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const ticketModel = mongoose.model('ticket',tiketSchema)

module.exports = ticketModel
