'use client'

import DashboardInfo from '@/dashboard/DashboardInfo';
import DashboardSider from '@/dashboard/DashboardSider';
import { fetchProfileInfo } from '@/dashboard/fetch';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function Dashboard({}: Props) {
  const [error, setError] = useState<string>(''); 
  const [profileUrl, setProfileUrl] = useState<string>(''); 
  const [imageFile, setImageFile] = useState<string>('');
  const [publishedLength, setPublishedLength] = useState<number>(); 
  const [userId, setUserId] = useState<any>(); 
  const [bookmarkLength, setBookmarkLength] = useState<number>(); 
  const [draftsLength, setDraftsLength] = useState<number>(); 

  useEffect(() => {
    fetchProfileInfo(setError, setProfileUrl, setDraftsLength, setPublishedLength, setUserId, setImageFile, setBookmarkLength); 
  }, [])
  return (
    <main className={`flex w-screen h-screen flex-col items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>
      
      <div className={`flex md:flex-col w-full h-full items-center space-x-2 p-4`}>
        <div className="flex basis-1/4 bg-[#171717] rounded-xl w-full h-full">
          <DashboardSider profileUrl={profileUrl} profilePath={imageFile} userId={userId}/>
        </div>

        <div className="flex basis-3/4 rounded-xl w-full h-full">
          <DashboardInfo 
            published={publishedLength}
            userId={userId}
            reading={bookmarkLength}
            drafts={draftsLength}
          />
        </div>
      </div>
    </main>
  )
}

export default Dashboard