import Image from 'next/image'
import React from 'react'

type Props = {}

function FeaturedAuthor({}: Props) {
  return (
    <div className="flex py-4 items-center w-full h-full justify-center px-24 halfxl:px-10 space-x-24 halflg:space-x-12 sm:space-x-6 bg-[#F5E29B]/10">
      <div className="flex flex-col w-1/2 space-y-5 text-white">
        <p className="font-black text-5xl halflg:text-3xl bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text">Our Feautured author is Mary Imlay Taylor</p>
        <p className="text-xl halflg:text-lg sm:text-base sm:line-clamp-4 xs:hidden font-light">She is the author of some of our favorite stories, like The Long Way, The Wild Fawn and A candle in the Wind.</p>
        <p className="text-xl halflg:text-lg sm:text-base font-light">Click <span className="font-bold underline">here</span> to view Taylor's catalogue of works available on Knovel Protocol.</p>
      </div>

      <div className="relative flex w-fit h-fit rounded-2xl">

        <div className="w-fit h-fit">
          <Image
            className="w-[700px] h-[700px] xl:w-[650px] xl:h-[650px] lg:w-[500px] lg:h-[450px] halflg:w-[350px] halflg:h-[300px] sm:w-[250px] sm:h-[200px] rounded-2xl z-10"
            src="/mary.png" 
            alt="cover of 'The Long Way'"
            width={"1200"}
            height={"1600"}
            quality={100}
          />
        </div>
       
      </div>

    </div>
  )
}

export default FeaturedAuthor