import React from 'react';
import imageData from "../public/books.json";
import Image from 'next/image';
import Bookmark from '@/icons/Bookmark';
import Carousel from './Carousel';

type Props = {}

function Features({}: Props) {
  return (
    <div className="text-white px-40 xxl:px-28 xl:px-28 halfxl:px-12 lg:px-20 halflg:px-10 w-full h-full">
      <p className="text-6xl sm:text-3xl font-black bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Be a part of the most revolutionary literary platform.</p>

      <div className="flex space-x-4 lg:flex-col mt-20 xl:mt-10 w-full h-full lg:space-y-8">

        {/* features image */}
        <div className="w-[1100px] halfxl:w-[800px] lg:w-full">
          <Carousel />
        </div>
        
        <div className="flex flex-col h-full w-1/2 lg:w-full">
          <div className="flex flex-col space-y-4">
              <p className="text-4xl xxl:text-3xl lg:text-3xl sm:text-xl font-semibold">Knovel Empowers Authors & Readers</p>
              <p className="font-light">
                The average income for full-time authors has fallen by more than 60% in the last 16 years. 
                Knovel aims to fix this and add value to digital publishing by improving the readers' experience, 
                and making the system more equitable for authors. 
              </p>
          </div>
        
          <div className='flex flex-col space-y-10 mt-8'>

            <div className="flex space-x-2 items-center">
              <Bookmark className='size-[30px]'/>
              <div className="flex flex-col">
                <p className="text-4xl xxl:text-3xl xl:text-2xl lg:text-3xl sm:text-xl font-semibold">Author Fair Share</p>
                <p className="font-light sm:text-sm">Publish content and get compensated immediately without losing any royalties.</p>
              </div>
            </div>

            <div className="flex space-x-2 items-center">
              <Bookmark className='size-[30px]'/>
              <div className="flex flex-col">
                <p className="text-4xl xxl:text-3xl xl:text-2xl lg:text-3xl sm:text-xl font-semibold">Reward Your Authors</p>
                <p className="font-light sm:text-sm">Readers get to incentivize their favorite authors without the interference of intermediary publishing companies.</p>
              </div>
            </div>

            <div className="flex space-x-2 items-center">
              <Bookmark className='size-[30px]'/>
              <div className="flex flex-col">
                <p className="text-4xl xxl:text-3xl xl:text-2xl lg:text-3xl sm:text-xl font-semibold">Digital First Editions</p>
                <p className="font-light sm:text-sm">Thanks to blockchain technology, all content are unique and collectible, much like a first-edition book.</p>
              </div>
            </div>
              
          </div>
      
        </div>
      </div>
      
     
      
    </div>
  )
}

export default Features