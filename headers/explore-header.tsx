import Profile from '@/icons/Profile'
import SearchIcon from '@/icons/SearchIcon'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import AccountDropdown from '@/app/dropdown/AccountDropdown';
import Link from 'next/link';
import Image from 'next/image';
import { retrieveProfilePhoto } from '@/dashboard/fetch';

type Props = {}

function ExploreHeader({}: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>(''); 
  const [profileUrl, setProfileUrl] = useState<string>(''); 


  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }

  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    retrieveProfilePhoto(setError, setProfileUrl)
  }, [])


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex z-40 w-full backdrop-blur-md text-white items-center font-mono text-sm py-4 px-6 md:p-8 sm:py-4 sm:px-2 xs:px-1 xs:py-8">
       {/* logo */}
      <div className="flex relative items-center basis-1/4">

          <Image 
            onClick={() => router.push(`/explore`)}
            className="hover:cursor-pointer flex w-fit absolute left-4"
            src="/knovel-logo-white.png"
            alt="knovel community"
            width={"45"}
            height={"45"}
            quality={100}
            priority        
          />
      

      </div>

      

      <form onSubmit={handleSearch} className="flex items-center basis-2/4 bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] rounded-3xl p-0.5">
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

      <div className="flex relative basis-1/4 items-center justify-around">
        <div onClick={() => router.push("/dashboard")} className='flex absolute right-2/4 hover:cursor-pointer'>
          <p className="halflg:hidden">dashboard</p>
        </div>

        <div onClick={() => router.push("/dashboard")} className='flex absolute right-1/4 hover:cursor-pointer'>
          <p className="halflg:hidden">community</p>
        </div>

        <div ref={dropdownRef} className="hover:cursor-pointer right-4 absolute">
            <div onClick={toggleDropdown} className="rounded-full w-[50px] h-[50px]">
              {profileUrl ? (
                  <img 
                    className="rounded-full w-full h-full"
                    src={profileUrl}
                  />
      
              ) : (
                <Profile className=' stroke-white'/>
              )}
            </div>
        
            {dropdown && (
              <div className="absolute right-0 mt-6 w-52 bg-[#1d242e] rounded-lg shadow-xl z-50">
                <AccountDropdown />
              </div>
            )}
        </div>
     
      </div>

  
    </div>
  )
}

export default ExploreHeader