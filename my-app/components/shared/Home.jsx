"use client"


import React, { useState } from 'react'
import { Textarea } from '@/components//ui/textarea'
import { City }  from 'country-state-city';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

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
import CitySelector from './CitySelector';
import { createPost } from '@/actions/post.actions';
import Loader from './Loader';
import LatestParties from './LatestParties';





const Home = ({databaseUser, data}) => {
  
  const allCities = City.getCitiesOfCountry("IN")
  const [submitting, setSubmitting] = useState(false);
    
  const formSchema = z.object({
  content: z.string().min(2).max(250),
  image:z.string().optional(),
  city:z.string().optional()
})
    
const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      image:"",
      city:""
    },
  })
   

      async function onSubmit(values) {
        
        setSubmitting(true)
        let newPost;

        try {
          newPost = await createPost({
            user:databaseUser._id.toString(),
            content: values.content,
            city: values.city,
            image: values.image
          })
        } catch (error) {
          console.log(error)
        }
        
        if(newPost){
          form.reset();
          setSubmitting(false);
        }
      }

     if(submitting){
      return <Loader/>
     }

    return (
   
        <>
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
      <div className='flex flex-col gap-2 mt-10' >
        <h3 className='text-2xl font-bold tracking-wider' >Latest Parties</h3>
        <LatestParties databaseUser={databaseUser} data={data}/>
        </div> 
      
        
        </>
   
  )
}

export default Home