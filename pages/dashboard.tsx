import DashboardSider from '@/dashboard/DashboardSider';
import { fetchProfileInfo } from '@/dashboard/fetch';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function dashboard({}: Props) {
  const [error, setError] = useState<string>(''); 
  const [profileUrl, setProfileUrl] = useState<string>(''); 
  const [imageFile, setImageFile] = useState<string>('');

  useEffect(() => {
    fetchProfileInfo(setError, setProfileUrl); 
  }, [])
  return (
    <main className={`flex w-screen h-screen flex-col items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>
      
      <div className={`flex w-full h-full items-center space-x-2 p-4`}>
        <div className="flex basis-1/4 bg-[#171717] rounded-xl w-full h-full">
          <DashboardSider profileUrl={profileUrl}/>
        </div>

        <div className="flex basis-3/4 rounded-xl w-full h-full overflow-y-scroll">

        </div>
      </div>
    </main>
  )
}

export default dashboard