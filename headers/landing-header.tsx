import SearchIcon from '@/icons/SearchIcon';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode; 
}

function LandingHeader({children}: Props): JSX.Element {
  return (
    <div className="flex z-10 w-full backdrop-blur-md text-white items-center font-mono text-sm px-6 py-2 md:p-8 sm:py-4 sm:px-2 xs:px-1 xs:py-8">
        {/* logo */}
        <div className="flex sm:hidden">
          <p>knovel</p>
        </div>
       

        {/* Search Functionality */}
        <div className="flex justify-center items-center w-full">
          <div className="w-1/3 halfxl:w-3/4 sm:w-4/5">
              <div className="flex w-full bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] rounded-full p-0.5 cursor-not-allowed">
                <div className="flex justify-between p-1 bg-black w-full h-full rounded-full">
                    <div className="flex items-center text-gray-400 space-x-2 md:text-sm xs:text-xs">
                        <SearchIcon className="size-5 md:size-4 sm:hidden"/>
                        <p>Search our library</p>
                    </div>
                  
                    <div className="bg-white font-bold text-xs rounded-full text-black px-8 md:px-4 py-3 xs:py-1">
                        <p>FIND A BOOK</p>
                    </div>
                </div>
              

              </div>
          </div>
        </div>
        
     
    </div>
  )
}

export default LandingHeader