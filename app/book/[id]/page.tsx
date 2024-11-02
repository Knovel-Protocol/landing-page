'use client'

import { Book } from '@/index';
import React, { useEffect, useState } from 'react';
import StarRating from '@/components/StarRating';
import ExploreHeader from '@/headers/explore-header';
import { formatDate } from '@/components/tools/formatDate';
import Link from 'next/link';
import FlowButton from '@/buttons/FlowButton';
import Bookmark from '@/icons/Bookmark';
import FillBookmark from '@/icons/FillBookmark';
import { fetchBookData, fetchBookmark, updateBookmarkData } from '@/drafts/fetch';


type BookProps = {
  params: {
    id: string;
  };
};

function BookPage({params}: BookProps) {
  const [bookmark, setBookmark] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 
  const [userId, setUserId] = useState<string>(''); 
  const [book, setBook] = useState<Book | null>(null);


  const { id } = params;


  useEffect(() => {
    if(id){
      fetchBookmark(setError, id, setBookmark, setUserId); 
      fetchBookData(id).then((bookData) => setBook(bookData));

    }
    
  }, [id])

  const handleBookmarkClick = async () => {
    setBookmark(!bookmark); 

    if(id){
      updateBookmarkData(userId, bookmark, id); 
    }
    
  }

  return (
    <main className={`flex w-screen h-screen flex-col items-center`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <div className="w-full h-full flex halflg:flex-col px-28 py-10 xxl:px-16 halfxl:px-10 overflow-hidden xxl:space-x-8 halflg:space-x-0 halflg:space-y-8">

        <div className="basis-1/3 flex h-full w-full flex-col items-center halflg:justify-center space-y-3">
            <div className="w-fit h-fit">
              <img 
                className="z-10 p-0.5 bg-white w-[400px] h-[600px] lg:w-[300px] lg:h-[450px] halflg:w-[450px] halflg:h-fit md:w-[300px] md:h-fit group-hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-xl object-cover" 
                src={book?.book_image} 
                alt={book?.title}
              />
            </div>

            <div className="flex w-2/3 halflg:w-1/3 items-center space-x-4">
              <Link className="basis-4/5" href={`/read/${[id]}`}>
                <FlowButton 
                  title='Read'
                  buttonRadius='rounded-3xl'
                />
              </Link>
              
              <div onClick={handleBookmarkClick} className="basis-1/5 hover:cursor-pointer">
                {bookmark ? (
                  <div className="text-[#7F60F9]">
                  <FillBookmark className="size-10"/>
                  </div>
                ) : (
                  <div className="text-white">
                  <Bookmark className='size-10'/>
                  </div>
                )}
                
              </div>
              
           </div>
             
        </div>



        <div className="w-full h-full basis-2/3 flex-col space-y-8 text-white overflow-y-auto">
          <div className="flex flex-col space-y-3">
              <p className="text-4xl font-bold">{book?.title}</p>
              <p className="text-xl font-medium">{book?.author_name}</p>
              <StarRating rating={book?.rating ?? 0}/> 

              <p className="font-light w-3/4 halflg:w-full">{book?.book_synopsis}</p>
              
              <div className="flex space-x-2">
                <p>Genres:</p>

                {book?.book_genre.map((genre, index) => (
                  <div key={index} className="flex space-x-1 font-light">
                    <p>{genre}</p>
                  </div>
                ))}
              </div>
            
            <div className="flex space-x-1 text-sm font-extralight">
                <p>Published:</p>
                <p> {formatDate(`${book?.created_at}`)}</p>
            </div>
          </div>
             
          <div className="flex flex-col h-full mt-2">
            <p className="text-base">Table of Contents:</p>
            <div className="flex flex-col space-y-2">
              {book?.book_chapters?.map((chapter, index) => (
                <div key={index} className="flex items-center font-semibold text-xl hover:cursor-pointer rounded-2xl hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] p-3">
                  <p><span className="text-[#bbb9b9] text-sm font-light">Chapter {index + 1}:</span> {chapter.title}</p>
                </div>
              ))}
            </div>
            
          </div>
            
        </div>
            
      </div>
    </main>
  )
}

export default BookPage

