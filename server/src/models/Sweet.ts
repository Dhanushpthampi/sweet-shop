import mongoose, { mongo } from "mongoose";

const sweetSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
    }, 
    category:{
        type:String,
        required:true
    }
})

export default mongoose.model("Sweet", sweetSchema);