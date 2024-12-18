"use server"

import { connectToDatabase } from "@/database/connectDb"
import Post from "@/database/models/post.model"
import User from "@/database/models/user.model"

export async function createUser(user) {
    try {
      await connectToDatabase()
  
      const newUser = await User.create(user)
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      console.error(error)
    }
  }


  export async function getUser(id) {
    try {
      await connectToDatabase();
      const user = await User.find({clerkId:id}).populate({
        path:"posts",
        model:Post,
        
      })
      return JSON.parse(JSON.stringify(user)) 
    } catch (error) {
      console.error(error)
    }
  }