import Link from 'next/link'
import React from 'react'

type Props = {
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

function TrendingHeader({setCurrentPage, currentPage}: Props) {
  const handleClick = (page: number) => (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior
    setCurrentPage(page);   // Update the current page
  };

  return (
    <div className="flex w-full text-2xl text-white space-x-8 halflg:text-xl sm:text-base">

     
      <p onClick={handleClick(0)} className={`hover:cursor-pointer ${currentPage === 0 ? 'font-extrabold' : 'font-light text-gray-400'}`}>Trending</p>

      <p onClick={handleClick(1)} className={`hover:cursor-pointer ${currentPage === 1 ? 'font-extrabold' : 'font-light text-gray-400'}`}>Top Rated</p>

      <p onClick={handleClick(2)} className={`hover:cursor-pointer ${currentPage === 2 ? 'font-extrabold' : 'font-light text-gray-400'}`}>New Releases</p>

      <p onClick={handleClick(3)} className={`hover:cursor-pointer ${currentPage === 3 ? 'font-extrabold' : 'font-light text-gray-400'}`}>Most Read</p>
    </div>
  )
}

export default TrendingHeader