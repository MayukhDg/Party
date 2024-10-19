"use server"

import { connectToDatabase } from "@/database/connectDb"
import Post from "@/database/models/post.model";
import User from "@/database/models/user.model";
import { revalidatePath } from "next/cache";

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


export async function getPosts({ limit, pageNumber }) {
  
  const skipAmount = (Number(pageNumber) - 1) * limit
  
  try {
       await connectToDatabase();
       const posts = await Post.find({}).sort({
        createdAt:"desc"
       }).limit(limit).
       skip(skipAmount).
       populate({
        path:"user",
        model:User,
        })
  
    const postsCount = Post.countDocuments({})

      
       return {
        data:JSON.parse(JSON.stringify(posts)),
        totalPages: postsCount
       }

    } catch (error) {
      console.error(error)
    } 
}


export async function getPostsByUser(userId) {
    try {
       await connectToDatabase();
       const userPosts = await Post.find({user:userId}).populate({
        path:"user",
        model:User
       })
       return JSON.parse(JSON.stringify(userPosts))
    } catch (error) {
      console.log(error)
    }
}


export async function delPost({ postId, userId, path}) {
    try {
      await connectToDatabase();
      const deletedPost =  await Post.findByIdAndDelete(postId);
      
      await User.findByIdAndUpdate(userId, {
        $pull:{posts:deletedPost._id}
      })
       
      return JSON.parse(JSON.stringify(deletedPost))
      revalidatePath(path)
    } catch (error) {
      
    }
}



