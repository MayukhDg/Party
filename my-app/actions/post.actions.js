"use server"

import { connectToDatabase } from "@/database/connectDb"
import Post from "@/database/models/post.model";
import User from "@/database/models/user.model";

export async function createPost({user, content, city, image}){
   
  try {
    await connectToDatabase();
    const newPost = await Post.create({
        user, content, city, image
    })
    await newPost.save();
    await User.findByIdAndUpdate(user, {
        $push:{posts:newPost._id}
    })
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    console.log(error)
  }

}