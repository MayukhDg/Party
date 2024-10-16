import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },

    content:{
        type:String,
        required:true,
    },

    city:{
        type:String,
        required:true,
    },

    image:{
        type:String,
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }


})

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;