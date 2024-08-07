import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import React from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function explore({}: Props) {
  return (
    <main className={`flex w-screen min-h-screen flex-col items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>
      

    </main>
  )
}

export default explore