import CoinIcon from '@/icons/CoinIcon'
import CoinIcon2 from '@/icons/CoinIcon2'
import ConnectIcon from '@/icons/ConnectIcon'
import TrophyIcon from '@/icons/TrophyIcon'
import Image from 'next/image'
import React from 'react'

type Props = {}

function ComingSoon({}: Props) {
  return (
    <div className="h-full w-full grid grid-cols-2 lg:grid-rows-2 px-28 xl:px-24 halfxl:px-10 lg:px-4 sm:px-2 py-10 md:py-4 sm:py-2 gap-4 sm:gap-2">

      <div className="flex flex-col lg:space-y-4 w-full justify-between bg-[#141414] row-span-2 lg:col-span-2 py-10 sm:py-4 px-8 sm:px-4">
        <p className="text-[#a5a5a5] font-mono sm:text-xs">INTERCHAIN ACCOUNTS</p>
        <div className="flex w-full items-center justify-center text-white lg:hidden">
          <Image 
            className="w-[500px] h-[500px]"
            src="/coin.png"
            alt=""
            width={"600"}
            height={"600"}
            quality={100}
          />
        </div>
       
        <div className="flex flex-col space-y-10 -mt-10">
          <p className="text-6xl lg:text-4xl sm:text-xl font-black bg-gradient-to-r from-white to-white/40 text-transparent bg-clip-text">Authors get paid in native tokens for their content. </p>
          <p className="text-[#a5a5a5] text-sm sm:text-xs">COMING SOON</p>
        </div>
       
      </div>

      <div className="flex w-full bg-[#141414] py-10 px-4 sm:py-4">
        <div className="flex w-1/2 flex-col justify-between">
          <p className="text-[#a5a5a5] font-mono sm:text-xs">DECENTRALIZED EXCHANGE</p>
          <p className="text-5xl lg:text-4xl sm:text-base font-black bg-gradient-to-r from-white to-white/40 text-transparent bg-clip-text">Connect with Knovel storytellers. </p>
          <p className="text-[#a5a5a5] text-sm sm:text-xs">COMING SOON</p>
        </div>

        <div className="flex w-1/2 self-center lg:hidden">
          <Image 
            className="w-fit h-fit"
              src="/book.png"
              alt=""
              width={"600"}
              height={"600"}
              quality={100}
          />
        </div>
      
      </div>

      <div className="flex w-full bg-[#141414] py-10 px-4 sm:py-4 text-white">
          <div className="flex flex-col w-1/2 justify-between">
            <p className="text-[#a5a5a5] sm:text-xs font-mono">WEEKLY COMPETITIONS</p>
            <p className="text-5xl lg:text-4xl sm:text-base font-black bg-gradient-to-r from-white to-white/40 text-transparent bg-clip-text">Weekly community-led writing competitions. </p>
            <p className="text-[#a5a5a5] text-sm sm:text-xs">COMING SOON</p>
          </div>
           
          <div className="flex w-1/2 self-center lg:hidden">
            <Image 
              className="w-fit"
              src="/badge.png"
              alt=""
              width={"600"}
              height={"600"}
              quality={100}
            />
          </div>
          
      </div>
    

    </div>
  )
}

export default ComingSoon