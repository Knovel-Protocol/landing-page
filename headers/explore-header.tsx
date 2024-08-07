import Profile from '@/icons/Profile'
import SearchIcon from '@/icons/SearchIcon'
import React from 'react'

type Props = {}

function ExploreHeader({}: Props) {
  return (
    <div className="flex z-10 w-full backdrop-blur-md text-white items-center font-mono text-sm px-6 py-2 md:p-8 sm:py-4 sm:px-2 xs:px-1 xs:py-8">
       {/* logo */}
      <div className="relative flex basis-1/4 justify-evenly">

        <div className="absolute left-0">
          <p>knovel</p>
        </div>
        
        <p>write</p>
         <p>genres</p>
      </div>

      

      <div className="flex basis-2/4 bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] rounded-3xl p-0.5">
        <div className="w-full flex bg-black rounded-3xl items-center p-0.5 px-2">
          <SearchIcon className="size-5 md:size-4 sm:hidden"/>
          <input className="flex justify-between py-3 px-3 bg-black w-full h-full rounded-3xl focus:outline-none" placeholder="Search books, authors and community"/>
        </div>
      </div>

      <div className="flex basis-1/4 items-center justify-around">
        <p>community</p>
        <p>my library</p>
        <Profile className='stroke-white'/>
      </div>

     
    </div>
  )
}

export default ExploreHeader