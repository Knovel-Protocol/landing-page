'use client'

import LoadingPage from '@/components/loading/LoadingPage';
import ReadList from '@/components/read/ReadList';
import { fetchBookInfo } from '@/components/read/fetch';
import ExploreHeader from '@/headers/explore-header';
import Arrowleft from '@/icons/Arrowleft';
import Arrowright from '@/icons/Arrowright';
import React, { useEffect, useState } from 'react'


type Chapter = {
  title: string;
  content: string;
};

type PageProps = {
  params: {
    id: string;
  };
};

function Read({params}: PageProps) {
  const { id } = params;

  const [chapters, setChapters] = useState<Chapter[]>([]); // Store the list of chapters
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(id){
      const bookId = typeof id === 'string' ? id : '';
      fetchBookInfo(bookId, setChapters, setLoading); 
    } 
  }, [id])
  
  if(loading) {
    return (
      <div className="bg-black w-screen h-screen">
        <LoadingPage />
      </div>
    )
  }

  return (
    <main className={`flex w-screen h-screen flex-col items-center`}>
      
       <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <div className={`flex flex-col w-full h-full items-center px-8 py-4 overflow-hidden`}>

        <div className='w-full h-full bg-[#171717] text-white rounded-xl p-2 overflow-y-scroll' >
          <ReadList chapters={chapters}/>
        </div>


      
      </div>

    </main>
  )
}

export default Read