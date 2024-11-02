import MoreInfo from '@/icons/MoreInfo';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  chapters: any[];
  draftId ?: string;
}

function DraftList({chapters, draftId}: Props) {
  const router = useRouter();

  const handleBookClick = (index: number) => {
    // Navigate to the book page using the book's ID
    router.push(`/edit/${draftId}/${index}`);
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {chapters.length == 0 ? (
         <p className="text-gray-400">No chapters available.</p>
      ): (
        chapters.map((chapter, index) => (
           <div onClick={() => handleBookClick(index)} key={index} className="p-4 hover:cursor-pointer hover:bg-[#171717] rounded-xl">
              <div className="text-slate-500 font-light text-xs">
                {new Date(chapter.createdAt).toLocaleDateString('en-US', {
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric'
                })}
              </div>

              <div className="text-slate-500">
                   <p>Chapter {index + 1}</p>   
              </div>

              <div className="text-slate-500 text-xl font-semibold">
                   <p>{chapter.title}</p>   
              </div>

              <div className="flex text-slate-500 space-x-4 text-sm items-center">
                <p>0 Comments</p>
            
                <div className="flex space-x-2 text-slate-500 items-center">
                  <p>Incomplete</p>
                  <MoreInfo className='stroke-slate-500'/>
                </div>
               
              </div>

          </div>
        ))
       

      )}  

    

    </div>
  )
}

export default DraftList