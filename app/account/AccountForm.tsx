import Back from '@/icons/Back'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useProfile } from './fetch'
import FlowButton from '@/buttons/FlowButton'

type Props = {}

function AccountForm({user}: {user: User | null}) {
 
  const {
    loading,
    fullname,
    setFullname,
    username,
    setUsername,
    avatar_url,
    setAvatarUrl,
    fetchProfile
  } = useProfile(user);


  useEffect(() => {
    fetchProfile(); 
  }, [user, fetchProfile])
  


  return (
    <div className="flex-col relative">
      <Link href="/explore" className="absolute left-10 text-white">
        <Back className="size-8 stroke-white" />
      </Link>

      <div className="flex">
          <div className="">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
      </div>
  
      

     

      <Link href="/signin">
          <FlowButton 
            title='Sign out'
            buttonRadius='rounded-3xl'
          />
      </Link>
    </div>
  )
}

export default AccountForm