"use server"

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