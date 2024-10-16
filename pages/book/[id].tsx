import { GetServerSideProps } from 'next';
import { Book } from '@/index';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import StarRating from '@/components/StarRating';
import ExploreHeader from '@/headers/explore-header';
import { formatDate } from '@/app/tools/formatDate';
import Link from 'next/link';
import FlowButton from '@/buttons/FlowButton';
import Bookmark from '@/icons/Bookmark';
import FillBookmark from '@/icons/FillBookmark';
import { fetchBookmark, updateBookmarkData } from '@/drafts/fetch';


type BookProps = {
  book: Book | null;
};

const supabase = createClient();

function BookPage({book}: BookProps) {
  const [bookmark, setBookmark] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 
  const [userId, setUserId] = useState<string>(''); 

  useEffect(() => {
    if(book?.id){
      fetchBookmark(setError, book?.id, setBookmark, setUserId); 
    }
    
  }, [book?.id])

  const handleBookmarkClick = async () => {
    setBookmark(!bookmark); 

    if(book?.id){
      updateBookmarkData(userId, bookmark, book?.id); 
    }
    
  }

  return (
    <main className={`flex w-screen h-screen flex-col items-center`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <div className="w-full h-full flex px-28 py-10 overflow-hidden">

        <div className="basis-1/3 flex h-full w-full flex-col items-center space-y-3">
            <div className="w-fit h-fit">
              <img 
                className="z-10 p-0.5 bg-white w-[400px] h-[600px] lg:w-[200px] lg:h-[320px] md:w-[150px] md:h-[250px] sm:w-[120px] sm:h-[180px] xs:w-[100px] xs:h-[160px] group-hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-xl object-cover" 
                src={book?.book_image} 
                alt={book?.title}
              />
            </div>

            <div className="flex w-2/3 items-center space-x-4">
              <Link className="basis-4/5" href={`/read/${[book?.id]}`}>
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

              <p className="font-light w-3/4">{book?.book_synopsis}</p>
              
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

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async({params}) => {
  if (!params || !params.id) {
    return {
      notFound: true, // Handle the case where id is not present
    };
  }

  const {id} = params as IParams;
  const {data, error} = await supabase.from('books').select('*').eq('id', id).single(); 

  if (error) {
    return { props: { book: null, error: error.message } };
  }

  return { props: { book: data, error: null } };
}