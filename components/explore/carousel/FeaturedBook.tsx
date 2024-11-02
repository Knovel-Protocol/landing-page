import Image from 'next/image'
import React from 'react'

type Props = {}

function FeaturedBook({}: Props) {
  return (
  <div className="flex py-4 items-center w-full h-full justify-center px-24 halfxl:px-10 space-x-24 halflg:space-x-12 sm:space-x-6 bg-[#9D5EE2]/10">

    <div className="flex flex-col w-1/2 space-y-5 sm:space-y-3 text-white">
      <p className="font-black text-5xl halflg:text-3xl bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text">Our Feautured book for this week is The Long Way by Mary Imlay Taylor</p>
      <p className="text-xl halflg:text-lg sm:text-base font-light sm:line-clamp-4 xs:hidden">Although in love with Belhaven, Eva had rejected him repeatedly and then married a young millionaire, Johnstone Astry. The story between her and Belhaven, however, continued and one evening, Astry surprises his wife.</p>
      <p className="text-xl halflg:text-lg sm:text-base font-light">Delve into Taylor's world of romance <span className="font-bold underline">here.</span> </p>
    </div>

    <div className="relative flex w-fit h-fit rounded-2xl bg-[#9D5EE2] p-2">

      <div className="w-fit h-fit">
        <Image
          className="rounded-2xl z-10 w-[400px] h-[600px] lg:w-[350px] lg:h-[500px] halflg:w-[270px] halflg:h-[400px] sm:w-[200px] sm:h-[320px] xs:w-[130px] xs:h-[220px]"
          src="https://m.media-amazon.com/images/I/71QQz6Vv5oL._AC_UF1000,1000_QL80_.jpg" 
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

export default FeaturedBook