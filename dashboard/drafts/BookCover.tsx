import { fetchDraftBookImage } from '@/drafts/fetch';
import React, { useEffect, useState } from 'react'

type Props = {
  imageFile : string;
  userId: string;
}

function BookCover({imageFile, userId}: Props) {
  const [bookUrl, setBookUrl] = useState<string>('');


  useEffect(() => {
    if(imageFile){
      fetchDraftBookImage(imageFile, setBookUrl, userId); 
    }
  }, [imageFile])
  return (
    <div className="h-[375px] w-[250px]">
      {bookUrl ? (
          <img
            src={bookUrl}
            alt={imageFile}

          />
          ) : (
            <div className="flex bg-[#2a2929] items-center justify-center self-center my-4 rounded-xl w-full h-full text-white">
              <p>no book cover</p>
            </div>
          )}
    </div>
  )
}

export default BookCover