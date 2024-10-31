import StarRating from '@/components/StarRating';
import { fetchReadingList } from '@/dashboard/fetch';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {
  userId: string;

}

type Book = {
  id: string;
  title: string;
  author_name: string;
  book_image: string;
  book_synopsis: string;
  book_genre: string[];
  author_verified: boolean;
  rating: number;
}

function Bookmark({userId}: Props) {
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  const handleBookClick = (bookId: string) => {
    // Navigate to the book page using the book's ID
    router.push(`/book/${bookId}`);
  };

  useEffect(() => {
    if(userId){
      fetchReadingList(userId, setBookmarks)
    }
    
  }, [userId])
  return (
    <div className="w-full h-full flex-col space-y-10 p-8 sm:p-2">
      {bookmarks.map((bookmark, index) => (
        <div  onClick={() => handleBookClick(bookmark.id)}  key={index} className="flex w-full h-fit space-x-4 hover:cursor-pointer">

              <div className=" w-[250px] h-[400px] sm:w-[200px] sm:h-[330px] flex-shrink-0">
                <img 
                  className="z-10 p-0.5 w-full h-full bg-white group-hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-xl object-cover" 
                  src={bookmark.book_image} 
                  alt={bookmark.title}
                />
              </div>

              <div className=" text-white flex-1 space-y-3">
                <p className="text-4xl sm:text-xl font-bold">{bookmark?.title}</p>
                
                <div className="flex items-center space-x-1">
                  <p className='text-xl md:text-lg sm:text-sm font-bold'>{bookmark.author_name}</p>
                  {bookmark.author_verified && (
                    <Image 
                    src="/verified.png"
                    alt="verified"
                    width={"20"}
                    height={"20"}
                    />
                  )}
                </div>

                <StarRating rating={bookmark?.rating ?? 0}/> 

                <p className="font-light sm:text-xs">{bookmark?.book_synopsis}</p>

                <div className="flex space-x-2">
                    <p>Genres:</p>

                    {bookmark?.book_genre.map((genre, index) => (
                      <div key={index} className="flex space-x-1 font-light">
                        <p>{genre}</p>
                      </div>
                    ))}
                </div>

             
              </div>

          
        </div>
      ))}
    </div>
  )
}

export default Bookmark