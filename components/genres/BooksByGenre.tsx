import { Book } from '@/index';
import React, { useEffect, useState } from 'react'
import { fetchBooksByGenre } from './fetch';
import StarRating from '@/components/StarRating';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  genre: string;
  title: string;
}

function BooksByGenre({genre, title}: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();


  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooksByGenre(genre);
      setBooks(data);
    };

    getBooks();
  }, [genre]);

  const handleBookClick = (bookId: string) => {
    // Navigate to the book page using the book's ID
    router.push(`/book/${bookId}`);
  };

  return (
    <div className="flex flex-col text-white">
      <p className="text-4xl lg:text-3xl font-extrabold">{title}</p>
    
      <div className={`flex overflow-x-auto space-x-10 md:space-x-4 mt-8 lg:mt-4 custom-scrollbar`}>
        {books.map((book) => (
          <div 
            key={book.id} 
            className="group flex-shrink-0 flex h-[400px] md:h-full items-center hover:cursor-pointer"
            onClick={() => handleBookClick(book.id)} 
          >
            
            <div className="flex bg-black h-full rounded-xl space-x-4 pr-2 items-center">
              <div className="w-fit h-fit">
                <img 
                  className="z-10 p-0.5 bg-white w-[250px] h-[400px] lg:w-[200px] lg:h-[320px] md:w-[150px] md:h-[250px] sm:w-[120px] sm:h-[180px] xs:w-[100px] xs:h-[160px] group-hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-xl object-cover" 
                  src={book.book_image} 
                  alt={book.title}
                  // style={{ width: '250px', height: '400px' }}
                />
              </div>
             

              <div className='hidden group-hover:block w-[300px] space-y-2'>
                <p className='text-3xl md:text-2xl sm:text-xl font-bold'>{book.title}</p>
                
                <div className="flex items-center space-x-1">
                  <p className='text-xl md:text-lg sm:text-base font-bold'>{book.author_name}</p>
                  {book.author_verified && (
                    <Image 
                    src="/verified.png"
                    alt="verified"
                    width={"20"}
                    height={"20"}
                    />
                  )}
                </div>
                
               
                <StarRating rating={book.rating}/> 
                <p className='line-clamp-6 md:line-clamp-4 sm:line-clamp-3 sm:text-xs'>{book.book_synopsis}</p>
              </div>
              </div>
          </div>
        ))}
      </div>
     
    </div>
  )
}

export default BooksByGenre