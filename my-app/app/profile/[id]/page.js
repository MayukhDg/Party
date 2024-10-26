import { getPostsByUser } from '@/actions/post.actions'
import PostCard from '@/components/shared/PostCard'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getUser } from '@/actions/user.actions'

const page = async({ params }) => {
  
  const userPosts = await getPostsByUser(params.id)
  const clerkUser = await currentUser();
  const databaseUser = await getUser(clerkUser.id)
      
   
  return (
    <section className=' p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white flex flex-col gap-7'>
      <h3 className='text-2xl font-bold tracking-wider'>{`${clerkUser?.username}'s posts`}</h3>
      { userPosts.length<1 ? (
       <h3>No parties posted yet</h3>
     ) : (
      <div className="flex gap-4 items-center flex-wrap">
        { userPosts.map((post, i)=>(
         <PostCard  databaseUser={databaseUser[0]} key={i} post={post} />
        )) }
      </div>
     ) }
    
    </section>
  )
}

export default page