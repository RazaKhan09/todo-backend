import mongoose from 'mongoose'


const todoSchema=new mongoose.Schema({
    content:{
        type:String
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema)