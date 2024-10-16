import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { getUser } from '@/actions/user.actions'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Home from '@/components/shared/Home'



const page = async() => {
  
  const clerkUser = await currentUser();
  const databaseUser = await getUser(clerkUser?.id)
  console.log(databaseUser);

  return (
    <section className=' p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white'>
     <SignedOut>
     <h1 className="text-5xl font-bold mb-6">Where will you be tonight? <br/>
        Share it Here
      </h1>
          <p className="text-xl mb-8">Meet the best people at parties with PartyPal</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href={ databaseUser[0]?._id?  "/explore-parties": "/sign-in"}>
            { databaseUser[0]?._id?  "Get Started": "Sign In"}
            </Link>
            
            </Button>
     </SignedOut>
     <SignedIn>
      <Home databaseUser={databaseUser[0]}/>
     </SignedIn>

    </section>
  )
}

export default page