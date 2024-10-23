import Image from 'next/image'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getPosts, tryFunc } from '@/actions/post.actions';
import { getUser } from '@/actions/user.actions';
import Pagination from '@/components/shared/Pagination';
import PostCard from '@/components/shared/PostCard';


const page = async ({ searchParams }) => {

  const clerkUser = await currentUser();
  const databaseUser = await getUser(clerkUser?.id)
  const { data, totalPages } = await getPosts({ limit:5, pageNumber: searchParams?.page || 1 })

   
  return (
    <section className=' p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white flex flex-col gap-3 overflow-hidden' >
           <h3 className='text-2xl font-bold tracking-wider' >Latest Parties</h3>
     
     { data.length<1 ? (
       <h3>No parties posted yet</h3>
     ) : (
      <div className="flex gap-4 items-center flex-wrap">
        { data.map((post, i)=>(
         <PostCard key={i} post={post} />
        )) }
      </div>
     ) }
   { /* <Pagination totalPages={totalPages} /> */}
    </section>
  )
}

export default page