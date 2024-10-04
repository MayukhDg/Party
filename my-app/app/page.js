import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <section className=' p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white'>
      <h1 className="text-5xl font-bold mb-6">Plan Your Perfect Party</h1>
          <p className="text-xl mb-8">Organize unforgettable events with ease using PartyPal</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/sign-up">
            Get Started
            </Link>
            
            </Button>

    </section>
  )
}

export default page