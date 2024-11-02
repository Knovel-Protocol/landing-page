'use client'

import DashboardSider from '@/dashboard/DashboardSider';
import UserListDrafts from '@/dashboard/drafts/UserListDrafts';
import { fetchProfileDrafts } from '@/dashboard/fetch';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

type PageProps = {
  params: {
    userId: string;
  };
};


function UserDrafts({params}: PageProps) {
  const { userId } = params;


  const [profileUrl, setProfileUrl] = useState<string>('');
  const [error, setError] = useState<string>(''); 


  useEffect(() => {
    if(userId){
      fetchProfileDrafts(userId, setProfileUrl, setError); 
    }
  }, [userId])
  
  return (
    <main className={`flex w-screen h-screen flex-col items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>
      
      <div className={`flex md:flex-col w-full h-full items-center space-x-2 p-4`}>
        <div className="flex basis-1/4 bg-[#171717] rounded-xl w-full h-full">
          <DashboardSider profileUrl={profileUrl} userId={userId || ''}/>
        </div>

        <div className="flex basis-3/4 rounded-xl w-full h-full">
          <UserListDrafts 
            userId={userId || ''}
            setError={setError}
          />
        </div>


      </div>
    </main>
  )
}

export default UserDrafts