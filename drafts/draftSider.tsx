import BookIcon from '@/icons/BookIcon'
import CommentIcon from '@/icons/CommentIcon'
import NewPage from '@/icons/NewPage'
import TrashIcon from '@/icons/TrashIcon'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { fetchBookImage } from './fetch'
import ImageUploader2 from '@/components/ImageUploader2'

type Props = {
 draftId ?: string;
 chapterCount ?: number | null;
 imageFile ?: string;
}

function DraftSider({draftId, chapterCount, imageFile}: Props) {
  const router = useRouter();
  const [chapters, setChapter] = useState<number | null>(null);
  const [bookUrl, setBookUrl] = useState<string>('');

  useEffect(() => {
    if(imageFile){
      fetchBookImage(imageFile, setBookUrl);
    }
  }, [imageFile])





  return (
    <div className="relative h-full w-full flex flex-col">
      <ImageUploader2 
        imageFile={imageFile}
        bookUrl={bookUrl}
      />

      <div className="text-white font-bold text-4xl text-center">
        <p>No Title</p>
      </div>
     

      <div className="flex-col w-full text-[#a5a5a5] text-sm items-center px-4 py-6">
          <p className="text-xs text-center mb-2">BOOK STATS</p>

          <div className="flex w-full space-x-10 text-sm items-center">
              <div className="flex space-x-2 items-center">
                <BookIcon className="stroke-[#a5a5a5]"/>
                <p>Chapters</p>
              </div>
            
              <div className="flex items-center bg-[#a5a5a5] rounded-2xl px-3 py-1 text-white">
                <p>{chapterCount}</p>
              </div>

          </div>
        
        <div className="flex space-x-2 text-sm items-center">
          <CommentIcon className="stroke-[#a5a5a5]"/>
          <p>Comments</p>
        </div>

      </div>

      <div onClick={() => router.push(`/newChapter?q=${draftId}`)} className="flex text-[#a5a5a5] text-sm items-center space-x-2 px-4 hover:cursor-pointer">
        <NewPage className="stroke-[#a5a5a5]"/>
        <p>new chapter</p>
      </div>

   
      <div className="text-white">
        <p>+genre</p>
      </div>

     

      <div className="p-4 mb-4 absolute bottom-0 w-full">
        <div className="hover:cursor-pointer bg-indigo-600 text-center p-3 rounded-xl font-semibold text-lg text-white">
          <p>publish</p>
        </div>

        <div className="flex items-center w-full justify-center mt-4 space-x-2 text-red-600 hover:cursor-pointer hover:underline">
          <TrashIcon />
          <p>delete</p>
        </div>
      </div>
     
    </div>
  )
}

export default DraftSider