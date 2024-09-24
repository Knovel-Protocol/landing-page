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

type Props = {
  profileUrl ?: string;
}

function DashboardSider({profileUrl}: Props) {
  return (
    <div className="relative flex flex-col h-fufll w-full px-14">

      <ProfilePhoto 
        profileUrl={profileUrl}
      />
      <Link href="/create" className="flex items-center justify-center text-lg font-bold w-full h-fit p-2 bg-indigo-600 rounded-2xl text-white">
        <p>+ Write</p>
      </Link>


      <div className="flex flex-col my-8 h-full space-y-4">
          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <HomeIcon />
            <p>Dashboard</p>
          </div>

          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <NewPage />
            <p>Drafts</p>
          </div>

          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <BookIcon /> 
            <p>Published</p>
          </div>

          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <QueueList className="size-6"/> 
            <p>Reading List</p>
          </div>

          <div className="flex items-center space-x-2 text-[#a5a5a5]">
            <FollowingIcon />
            <p>Following</p>
          </div>
      </div>

    

    
      

      <div className="bottom-8 absolute flex flex-col space-y-3 text-[#a5a5a5]">

        <div className="flex items-center space-x-2">
          <SettingsIcon /> 
          <p>Settings</p>
        </div>

        <div className="flex items-center space-x-2"> 
          <LogoutIcon />
          <p>Logout</p>
        </div>

      
      </div>
    
    </div>
  )
}

export default DashboardSider