import { GetServerSideProps } from 'next';
import { Book } from '@/index';
import { createClient } from '@/utils/supabase/client';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import StarRating from '@/components/StarRating';
import ExploreHeader from '@/headers/explore-header';
import { formatDate } from '@/app/tools/formatDate';
import Link from 'next/link';
import FlowButton from '@/buttons/FlowButton';


type BookProps = {
  book: Book | null;
  error: string | null;
};

const supabase = createClient();

function BookPage({book, error}: BookProps) {
  return (
    <main className={`flex w-screen h-screen flex-col items-center`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <div className="w-full h-full flex px-28 py-10">

        <div className="basis-1/3 flex  flex-col items-center space-y-3">
            <div className="w-fit h-fit">
              <img 
                className="z-10 p-0.5 bg-white w-[400px] h-[600px] lg:w-[200px] lg:h-[320px] md:w-[150px] md:h-[250px] sm:w-[120px] sm:h-[180px] xs:w-[100px] xs:h-[160px] group-hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-xl object-cover" 
                src={book?.book_image} 
                alt={book?.title}
              />
            </div>

            <div className="w-2/3">
              <Link href={`/read/${[book?.id]}`}>
                <FlowButton 
                  title='Read'
                  buttonRadius='rounded-3xl'
                />
              </Link>
           </div>
             
        </div>



        <div className="w-full h-full basis-2/3 flex-col space-y-3 text-white">
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