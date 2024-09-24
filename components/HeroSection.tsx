import FlowButton from '@/buttons/FlowButton';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
  children?: ReactNode;
}

function HeroSection({children}: Props) {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    setOffsetX((e.clientX / window.innerWidth) * 250 - 50);
    setOffsetY((e.clientY / window.innerHeight) * 250 - 50);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center text-white p-20 halfxl:px-18 xs:px-4 halfxl:py-10">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat filter blur z-0  bg-black opacity-50 transition-transform duration-400 ease-out"
         style={{
          transform: `translate(${offsetX / 20}px, ${offsetY / 20}px) rotateX(${offsetY / 50}deg) rotateY(${offsetX / 50}deg)`,
        }}
        ></div>
        <div className="relative z-10 flex flex-col space-y-16 xs:space-y-4 items-center transition-transform duration-400 ease-out"
         style={{
          transform: `translate(${offsetX / 10}px, ${offsetY / 10}px)`,
        }}
        >

          <p className="font-black text-center text-9xl md:text-8xl xs:text-7xl bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text">Read. Write. Earn.</p>
          <p className="text-2xl xs:text-lg md:text-xl max-w-prose text-center">Empowering authors with decentralized technology, Knovel revolutionizes the way you create, share, and earn from your stories.</p>

          <Link href="/signin">
            <FlowButton 
              title='GET STARTED'
              buttonRadius='rounded-3xl'
            />
          </Link>
            
          
        </div>
    
    </div>
  )
}

export default HeroSection