import Button from '@/buttons/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

function Connect({}: Props) {
  return (
    <div className="flex sm:flex-col sm:py-4 sm:space-y-10 items-center px-28 halfxl:px-10 md:px-4 space-x-8 md:space-x-2 sm:space-x-0">

      <div className="flex flex-col space-y-8 sm:space-y-4 py-4 w-2/5 sm:w-full text-white sm:items-center">
        <p className="text-4xl lg:text-3xl md:text-xl font-bold">Connect with a Community of Readers and Writers</p>

        <div className="flex space-x-2 md:space-x-0 items-center md:flex-col sm:flex-row sm:w-full sm:px-2 sm:space-x-4">
          <Image 
            className="w-fit h-fit halfxl:w-[90px] md:hidden sm:flex"
            src="/community.png"
            alt="knovel community"
            width={"235"}
            height={"105"}
            quality={100}        
          />
          <p className="font-extralight lg:text-sm md:text-xs">Join thousands of authors and readers on Knovel now to share your stories, discover new works, and earn rewards in a vibrant, decentralized ecosystem!</p>
        </div>

        <Link href="/signin" className="w-fit">
          <Button 
            title="Join"
            buttonRadius='rounded-3xl'
          />
        </Link>
     
      </div>

      {/* Image that demonstrates connection */}
      <div className="flex w-3/5 h-full sm:w-full">
        <Image 
          className="w-fit h-fit"
          src="/connect-img.png"
          alt=""
          width={"2741"}
          height={"1792"}
          quality={100}        
        />
      </div>
    </div>
  )
}

export default Connect