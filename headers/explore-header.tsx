import Profile from '@/icons/Profile'
import SearchIcon from '@/icons/SearchIcon'
import React, { useState } from 'react'
import { useRouter } from 'next/router';

type Props = {}

function ExploreHeader({}: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }

  };

  return (
    <div className="relative flex z-40 w-full backdrop-blur-md text-white items-center font-mono text-sm px-6 py-2 md:p-8 sm:py-4 sm:px-2 xs:px-1 xs:py-8">
       {/* logo */}
      <div className="flex basis-1/4 justify-evenly">

        <div className="absolute left-2 mr-4 flex self-center items-center">
          <p>knovel</p>
        </div>
        
        <p className="halflg:hidden">write</p>
        <p className="halflg:hidden">genres</p>
      </div>

      

      <form onSubmit={handleSearch} className="flex basis-2/4 bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] rounded-3xl p-0.5">
        <div className="w-full flex bg-black rounded-3xl items-center p-1">
          <SearchIcon className="size-5 md:size-4 sm:hidden"/>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex justify-between py-3 px-3 bg-black w-full h-full rounded-3xl focus:outline-none" 
            placeholder="Search books, authors and community"
          />

          <button type="submit" className="py-3 bg-white text-black font-bold px-4 rounded-3xl">
            Search
          </button>
        </div>

      </form>

      <div className="flex basis-1/4 items-center justify-around">
        <p>community</p>
        <p>library</p>
        <Profile className='stroke-white'/>
      </div>

     
    </div>
  )
}

export default ExploreHeader