import Bookmark from '@/bookmark/Bookmark';
import DashboardSider from '@/dashboard/DashboardSider';
import { fetchProfilePicture, fetchReadingList } from '@/dashboard/fetch';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });

function Readinglist({}: Props) {
  const router = useRouter(); 
  const {userId} = router.query; 

  const [profileUrl, setProfileUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<string>('');
  const [error, setError] = useState<string>(''); 
  


  useEffect(() => {
    if(userId) {
      fetchProfilePicture(setError, setProfileUrl, userId as string, setImageFile);
    }
   
  }, [userId])

 
  return (
    <main className={`flex w-screen h-screen flex-col items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <div className={`flex w-full h-full md:flex-col items-center space-x-2 p-4 overflow-hidden`}>
        <div className="flex basis-1/4 bg-[#171717] rounded-xl w-full h-full">
          <DashboardSider profileUrl={profileUrl} profilePath={imageFile} userId={userId}/>
        </div>

        <div className="flex basis-3/4 rounded-xl w-full h-full overflow-y-scroll">
          <Bookmark
             userId={userId as string}
          />
        </div>
      </div>
    </main>
  )
}

export default Readinglist