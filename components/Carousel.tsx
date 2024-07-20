import React from 'react';
import imageData from "../public/books.json"; 
import Image from 'next/image';

type Props = {}

function Carousel({}: Props) {
  return (
    <div className="overflow-hidden flex flex-col space-y-2">
       {/* features image */}
      <div className="flex w-full animate-scroll halfxl:animate-scroll2 lg:animate-scroll3 xs:animate-xsscroll space-x-4">
        {imageData.slice(0, 5).map(image => (
          <div key={image.id} className="flex-shrink-0">
            <Image 
              className="rounded-2xl halfxl:w-[150px] lg:w-[200px] md:w-[150px] xs:w-[100px]"
              src={image.image_url}
              alt={image.title}
              width={"200"}
              height={"300"}
              quality={75}
            />
          </div>
        ))}
        {imageData.slice(0, 5).map(image => (
          <div key={`${image.id}-duplicate`} className="flex-shrink-0">
            <Image
              className="rounded-2xl halfxl:w-[150px] lg:w-[200px] md:w-[150px] xs:w-[100px]"
              src={image.image_url}
              alt={image.title}
              width={"200"}
              height={"300"}
              quality={75}
            />
          </div>
        ))}
      </div>

      <div className="flex animate-reverseScroll halfxl:animate-reverseScroll2 lg:animate-reverseScroll3 xs:animate-xsreverseScroll w-full space-x-4">
        {imageData.slice(5, 10).map(image => (
          <div key={image.id} className="flex-shrink-0">
            <Image 
              className="rounded-2xl halfxl:w-[150px] lg:w-[200px] md:w-[150px] xs:w-[100px]"
              src={image.image_url}
              alt={image.title}
              width={"200"}
              height={"300"}
              quality={75}
            />
          </div>
        ))}
        {imageData.slice(5, 10).map((image) => (
          <div key={`${image.id}-duplicate`} className="flex-shrink-0">
            <Image
              className="rounded-2xl halfxl:w-[150px] lg:w-[200px] md:w-[150px] xs:w-[100px]"
              src={image.image_url}
              alt={image.title}
              width={"200"}
              height={"300"}
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel