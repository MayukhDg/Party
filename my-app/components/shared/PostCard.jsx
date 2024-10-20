"use client";


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { delPost } from '@/actions/post.actions';

const PostCard = ({ post, databaseUser}) => {
 

  const pathname = usePathname();
  const router = useRouter(); 

  const handleDelete = async()=>{
    const confirmDelete = confirm("Are you sure you want to delete the post?") 

    if(confirmDelete){
      try {
        const deletedPost = await delPost({
          postId:post._id,
          userId:databaseUser._id,
          path:pathname
        })
      } catch (error) {
        console.log(error)
      }
    }
}


  return (
    <div className='min-w-[250px] shadow-md p-3 flex flex-col gap-4' >
      <div className='flex justify-between items-center w-full'>
       <Link  href={`/profile/${post?.user?._id}`} >
       <Image
         src={post?.user?.photo}
         height={30}
         width={30}
         alt="profile"
         className='rounded-full object-contain'
       />
       </Link>
       <p>{new Date(post.createdAt).toDateString().toString()}</p>
      </div>
      <Image
        src={post?.image ? post?.image : "/party.jpg" }
        height={250}
        width={250}
        alt="party"
        className='object-contain w-full'
      
      /> 
      <p>{post.content}</p>
      {  
      databaseUser?._id === post.user?._id &&
       
       <div className='flex justify-between items-center w-full' >
       <button className='cursor-pointer' onClick={handleDelete}>
       <Image
          src="/trash.png"
          width={20}
          height={20}
          alt="delete"
      />
       </button>

       <button className='cursor-pointer' onClick={()=>router.push(`/post/edit/${post._id}`)}>
       <Image
          src="/edit.png"
          width={40}
          height={40}
          alt="edit"
      />
       </button>
       </div>

      } 
    </div>
  )
}

export default PostCard