
import { getPostById } from '@/actions/post.actions'
import EditPostForm from '@/components/shared/EditPostForm';


const page = async({ params}) => {
  
  const { id } = params 
  const postDetails = await getPostById(id)
  
  

    return (
    <div className='overflow-hidden p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white flex flex-col gap-3'>
       <EditPostForm  postDetails={postDetails}/>    
    </div>
  )
}

export default page