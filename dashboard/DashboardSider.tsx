import LogoutIcon from '@/icons/LogoutIcon'
import SettingsIcon from '@/icons/SettingsIcon'
import Link from 'next/link'
import React from 'react'
import ProfilePhoto from './profile/ProfilePhoto'
import HomeIcon from '@/icons/HomeIcon'
import NewPage from '@/icons/NewPage'
import BookIcon from '@/icons/BookIcon'
import QueueList from '@/icons/QueueList'
import FollowingIcon from '@/icons/FollowingIcon'
import { useRouter } from 'next/router'

type Props = {
  profilePath ?: string;
  profileUrl ?: string;
  userId : any;
}

function DashboardSider({profileUrl, profilePath, userId}: Props) {
  const router = useRouter(); 
  return (
    <div className="relative flex flex-col h-fufll w-full px-14 lg:px-8 sm:px-4">

      <ProfilePhoto 
        profilePath={profilePath}
        profileUrl={profileUrl}
        userId={userId}
        
      />
      <Link href="/create" className="flex items-center justify-center text-lg font-bold w-full h-fit p-2 sm:py-4 bg-indigo-600 rounded-2xl text-white">
        <p>+ Write</p>
      </Link>


      <div className="flex flex-col md:flex-row my-8 h-full space-y-4 md:space-x-4 md:justify-center md:space-y-0 sm:py-2 ss:text-sm">
          <div onClick={() => router.push(`/dashboard`)} className="flex items-center space-x-2 text-[#a5a5a5] hover:cursor-pointer">
            <HomeIcon className="md:hidden"/>
            <p>Dashboard</p>
          </div>

          <div onClick={() => router.push(`/drafts/${userId}`)} className="flex items-center space-x-2 text-[#a5a5a5] hover:cursor-pointer">
            <NewPage className='md:hidden' />
            <p>Drafts</p>
          </div>

          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <BookIcon className="md:hidden" /> 
            <p>Published</p>
          </div>

          <div onClick={() => router.push(`/readinglist/${userId}`)}  className="flex items-center space-x-2 text-[#a5a5a5]">
            <QueueList className="size-6 md:hidden"/> 
            <p>Reading List</p>
          </div>

          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <FollowingIcon className="md:hidden" />
            <p>Following</p>
          </div>
      </div>

    

    
      

      <div className="bottom-8 absolute flex flex-col md:hidden space-y-3 text-[#a5a5a5]">

        <div className="flex items-center space-x-2 sm:text-xl">
          <SettingsIcon /> 
          <p>Settings</p>
        </div>

        <div className="flex items-center space-x-2 sm:text-xl"> 
          <LogoutIcon />
          <p>Logout</p>
        </div>

      
      </div>
    
    </div>
  )
}

export default DashboardSider