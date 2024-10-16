import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

type Props = {
  published?: number;
  userId: any;
  reading ?: number;
  drafts ?: number; 
}

function DashboardInfo({published, userId, reading, drafts}: Props) {
  const router = useRouter(); 

  return (
    <div className='grid h-full w-full grid-cols-3 grid-rows-3 gap-4 p-4'>
      <div onClick={() => router.push(`/drafts/${userId}`)} className="flex flex-col bg-[#2a2829] rounded-3xl hover:cursor-pointer hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] p-8">
        <p className="flex basis-1/4 font-bold text-2xl text-white/50">Draft</p>
        <p className='flex basis-1/2 text-9xl font-extrabold bg-gradient-to-r from-white to-white/50 text-transparent bg-clip-text'>{drafts}</p>
        <p className="flex basis-1/4 text-white/50">documents</p>
      </div>

      <div className="flex flex-col bg-[#2a2829] rounded-3xl hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] hover:cursor-pointer p-8">
        <p className="flex basis-1/4 font-bold text-xl text-white/50">Published</p>
        <p className='flex basis-1/2 text-9xl font-extrabold bg-gradient-to-r from-white to-white/50 text-transparent bg-clip-text'>{published}</p>
        <p className="flex basis-1/4 text-white/50">documents</p>
      </div>

      <div className="flex flex-col bg-[#2a2829] rounded-3xl hover:cursor-pointer p-8 hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF]">
        <p className="flex basis-1/4 font-bold text-xl text-white/50">Reading List</p>
        <p className='flex basis-1/2 text-9xl font-extrabold bg-gradient-to-r from-white to-white/50 text-transparent bg-clip-text'>{reading}</p>
        <p className="flex basis-1/4 text-white/50">books</p>
      </div>

      <div className="bg-[#2a2829] rounded-3xl hover:cursor-pointer p-8 hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF]">
        <p className="font-bold text-xl text-white/50">Following</p>
        <p className='text-9xl font-extrabold bg-gradient-to-r from-white to-white/50 text-transparent bg-clip-text'>{1.6}k</p>
      </div>
      
    </div>
  )
}

export default DashboardInfo