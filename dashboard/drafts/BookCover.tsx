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
    <div className="h-[375px] w-[250px] xxl:w-[200px] xxl:h-[320px] xl:w-[300px] xl:h-[420px] lg:w-[250px] lg:h-[370px] halflg:w-[400px] halflg:h-[530px] md:w-[330px] md:h-[440px] sm:w-[200px] sm:h-[330px]">
      {bookUrl ? (
          <img
            className='flex w-full h-full'
            src={bookUrl}
            alt={imageFile}

          />
          ) : (
            <div className="flex bg-[#2a2929] items-center justify-center self-center rounded-xl w-full h-full text-white">
              <p>no book cover</p>
            </div>
          )}
    </div>
  )
}

export default BookCover