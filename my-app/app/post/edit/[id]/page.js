"use client"

import { getPostById, updatePost } from '@/actions/post.actions'
import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components//ui/textarea'
import { City }  from 'country-state-city';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Loader from '@/components/shared/Loader' 
import { usePathname } from 'next/navigation';


const page = ({ params}) => {
  
  const { id } = params 
  const [postDetails, setPostDetails] = useState({});

  useEffect(()=>{
     const fetchPostDetails = ()=>{
      getPostById(id).then(data=>setPostDetails(data));
     }
     fetchPostDetails();
  },[id])
  
  const [submitting, setSubmitting] = useState(false);
  console.log(postDetails) 
  
  const formSchema = z.object({
  content: z.string().min(2).max(250),
  image:z.string().optional(),
  city:z.string().optional()
})
    
const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: postDetails?.content,
      image:postDetails?.image,
      city: postDetails?.city
    },
  })
   

      async function onSubmit(values) {
        
        setSubmitting(true)
        

        try {
          await updatePost({
            postId:postDetails?._id,
            content: values.content,
            city: values.city
          })
        } catch (error) {
          console.log(error)
        }
        
        finally{
          form.reset();
          setSubmitting(false);
        }
      }

     if(submitting){
      return <Loader/>
     }

    return (
    <div className=' p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white flex flex-col gap-3'>
           <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">What plans tonight?</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px] resize-y text-black" placeholder="Post here..." {...field} />
                </FormControl>
                <FormDescription>
                 Post about your party plans for tonight
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
         
         <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Where are you?</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px] resize-y text-black" placeholder="Post here..." {...field} />
                </FormControl>
                <FormDescription>
                 Post about your party plans for tonight
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
         
          <Button type="submit">Submit</Button>
    </form>
      </Form>
    </div>
  )
}

export default page