import React from 'react'
import PostCard from './PostCard'

const LatestParties = ({data, databaseUser}) => {
  
    return (
    <div className='flex gap-3 items-center flex-wrap mt-4' >
       { data.length<1 ? (
       <h3>No parties posted yet</h3>
     ) : (
      <div className="flex gap-4 items-center flex-wrap">
        { data.map((post, i)=>(
         <PostCard databaseUser={databaseUser}  key={i} post={post} />
        )) }
      </div>
     ) }
    </div>
  )
}

export default LatestParties