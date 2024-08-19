import { Book } from '@/index';
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client';
import StarRating from '@/components/StarRating';
import Image from 'next/image';

type Props = {
  books: Book[]; // Add books as a prop of type Book[]
  currentPagination: number; // Add currentPagination as a prop
  booksPerPage: number; // Add booksPerPage as a prop
}

function TrendingBooks({books, currentPagination, booksPerPage}: Props) {
 
  

  return (
    <div className='flex flex-col w-full h-fit space-y-2'>
      {books.map((book, index) => (
        <div key={book.id} className="flex space-x-8 md:space-x-4 sm:space-x-2 items-center hover:cursor-pointer hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-full sm:rounded-xl px-8 xl:px-4 sm:px-2 py-4">
          
          <div className="flex basis-1/4 xs:basis-full w-full space-x-2 items-center mr-8 sm:mr-2">
            <div className="text-xl font-bold ">
               {/* Adjust the numbering based on the currentPagination */}
               {currentPagination * booksPerPage + index + 1}.
            </div>
            <div className="w-[120px] h-[120px]">
              <img 
                className="p-0.5 bg-white rounded-xl object-cover w-fit h-fit" 
                src={book.book_image} 
                alt={book.title} 
                style={{ width: '80px', height: '120px' }}
              />
            </div>

            <div className="flex-col w-[200px] md:w-[150px] sm:w-full">
              <p className="text-lg halfxl:text-base sm:text-sm xs:text-base font-semibold line-clamp-3">{book.title}</p>

              <div className='flex space-x-1 items-center'>
                <p className="text-sm halfxl:text-xs">{book.author_name}</p>
                {book. author_verified && (
                  <Image 
                    className="w-[20px] h-[20px] halfxl:w-[15px] halfxl:h-[15px]"
                   src="/verified.png"
                   alt="verified"
                   width={"20"}
                   height={"20"}

                  />)}

              </div>

              <StarRating rating={book.rating}/>
            </div>
          </div>

          <div className='flex basis-2/4 halflg:basis-3/4 xs:hidden h-fit'>
            <p className='text-sm line-clamp-3'>{book.book_synopsis}</p>
          </div>
         
          <div className="relative basis-1/4 flex-col space-y-2 halflg:hidden">
            <div className="flex space-x-2 overflow-hidden justify-end">
                {book.book_genre.map((genre, index) => (
                  <div 
                    key={index} 
                    className="text-white text-sm"
                  >
                    <p className="line-clamp-1">{genre}</p>
                  </div>
                ))}
            </div>

            <div className="absolute right-0 flex w-fit h-fit rounded-xl p-1 font-semibold text-xs bg-white text-black">
              <p>{book.finished ? 'complete' : 'incomplete'}</p>   
            </div>
          </div>
        
          
        </div>
      ))}
      
    </div>
  )
}

export default TrendingBooks