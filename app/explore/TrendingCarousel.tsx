import React, { useEffect, useState } from 'react'
import FeaturedBook from './carousel/FeaturedBook'
import FeaturedAuthor from './carousel/FeaturedAuthor';
import Contest from './carousel/Contest';

type Props = {}

function TrendingCarousel({}: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('left'); // Manage the swipe direction


  const pages = [
    <FeaturedBook key="book" />,
    <FeaturedAuthor key="author" />,
    <Contest key="contest"/>
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSwipeDirection('left');
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
    }, 5000); // Change page every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [])


  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`absolute inset-0 flex transition-transform duration-1000 ease-in-out transform ${
          swipeDirection === 'left'
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {pages.map((page, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-full"
          >
            {page}
          </div>
        ))}

      </div>
      <div className="flex w-full justify-center space-x-2 text-white z-10 absolute bottom-10">
        <p onClick={() => setCurrentPage(0)} className={`hover:cursor-pointer ${currentPage === 0 ? 'font-extrabold' : 'font-light'}`}>Featured Book</p>
        <p>•</p>
        <p onClick={() => setCurrentPage(1)} className={`hover:cursor-pointer ${currentPage === 1 ? 'font-extrabold' : 'font-light'}`}>Featured Author</p>
        <p>•</p>
        <p onClick={() => setCurrentPage(2)} className={`hover:cursor-pointer ${currentPage === 2 ? 'font-extrabold' : 'font-light'}`}>Contest</p>
      </div>
      
    </div>
  )
}

export default TrendingCarousel