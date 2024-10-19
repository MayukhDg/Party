import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <section className=' p-6 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white' >
     <Image
        src="/loader.svg"
        height={100}
        width={100}
        alt='loader'
     />

    </section>
  )
}

export default Loader;