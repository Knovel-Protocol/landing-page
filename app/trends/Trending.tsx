import React, { useEffect, useState } from 'react'
import TrendingBooks from './TrendingBooks'
import TrendingHeader from './TrendingHeader'
import { createClient } from '../../utils/supabase/client';
import { Book } from '@/index';
import { fetchBooks, fetchNewRelease, fetchTopRated } from './fetch';

type Props = {}

function Trending({}: Props) {
  const [currentPagination, setCurrentPagination] = useState(0);
  const booksPerPage = 5;

  const [currentPage, setCurrentPage] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    if(currentPage === 0){
      fetchBooks(currentPagination, booksPerPage, setBooks, setLoading, setError);
    }else if(currentPage === 1){
      fetchTopRated(currentPagination, booksPerPage, setBooks, setLoading, setError);
    }else if(currentPage === 2){
      fetchNewRelease(currentPagination, booksPerPage, setBooks, setLoading, setError);
    }else{
      //fetchmostred
    }
  }, [currentPage, currentPagination]);

  const handleNextPage = () => {
    setCurrentPagination(currentPagination + 1);
  };

  const handlePreviousPage = () => {
    if (currentPagination > 0) {
      setCurrentPagination(currentPagination - 1);
    }
  };

  return (
    <div className='text-white text-5xl w-full h-full space-y-4'>
      <TrendingHeader 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div className="w-full flex-shrink-0 h-full">
        <TrendingBooks 
          books={books}
          currentPagination={currentPagination} 
          booksPerPage={booksPerPage} 
        />

        <div className="flex justify-center space-x-4 mt-2">
          <button
            className={`text-base px-4 py-1 bg-gray-800 text-white rounded-full ${currentPagination === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePreviousPage}
            disabled={currentPagination === 0}
          >
            <p>Previous</p>
          </button>

        <button
          className={`text-base px-4 py-1 bg-gray-800 text-white rounded-full ${books.length < booksPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={books.length < booksPerPage}
        >
          <p>Next</p>
        </button>
      </div>
      </div>
   
    </div>
  )
}

export default Trending