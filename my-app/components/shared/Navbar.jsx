import { navLinks } from '@/constants'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="container mx-auto px-4 py-6 bg-purple-600">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">PartyPal</Link>
          <div className=" flex items-center space-x-4">
            { navLinks.map((link)=>(
            <Link className='hover:text-white' key={link.label} href={link.pathname}>
            { link.label }
            </Link>
            )) }
          <SignedIn>
            <UserButton/>
          </SignedIn>
          </div>
          
        </nav>
      </header>
  )
}

export default Navbar