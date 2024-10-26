import { getUser } from '@/actions/user.actions'
import { navLinks } from '@/constants'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const Navbar = async() => {
  
  
const clerkUser = await currentUser();
const databaseUser = await getUser(clerkUser?.id)
  
  

return (
    <header className="container mx-auto px-4 py-6 bg-purple-600">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">PartyPal</Link>
          <div className=" flex items-center space-x-4">
          <SignedIn>
            { navLinks.map((link)=>(
            <Link className='hover:text-white' key={link.label} href={link.pathname}>
            { link.label }
            </Link>
            )) }
            <Link href={`/profile/${databaseUser[0]?._id}`} >My Profile</Link>
             
            <UserButton/>
          </SignedIn>
          </div>
          
        </nav>
      </header>
  )
}

export default Navbar