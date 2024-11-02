'use client'

import TrendingCarousel from '@/components/explore/TrendingCarousel';
import Genre from '@/components/genres/Genre';
import Trending from '@/components/trends/Trending';
import TrendingHeader from '@/components/trends/TrendingHeader';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import React from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function Explore({}: Props) {
  return (
    <main className={`flex w-screen min-h-screen flex-col items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>
   
      <div className="flex w-full" style={{ height: '75vh' }}>
        <TrendingCarousel />
      </div>

      <div className="flex w-full h-full mt-20 halfxl:mt-10 px-20 xl:px-10 sm:px-2">
          <Trending />
      </div>

      <div className="w-full h-full">
        <Genre />
      </div>
      
    </main>
  )
}

export default Explore