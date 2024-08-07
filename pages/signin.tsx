import { login } from '@/app/actions/login';
import Signinform from '@/app/forms/Signinform';
import Button from '@/buttons/Button';
import SignInHeader from '@/headers/signin-header';
import Apple from '@/logos/Apple';
import Facebook from '@/logos/Facebook';
import Google from '@/logos/Google';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function signin({}: Props) {
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
    <main className={`flex flex-col w-screen h-screen items-center justify-center py-10 ${inter.className} overscroll-none`}>

      <div className="absolute inset-0 filter blur z-0 bg-black opacity-50 bg-hero-pattern bg-cover bg-center bg-no-repeat transition-transform duration-400 ease-out"
      style={{
        transform: `translate(${offsetX / 20}px, ${offsetY / 20}px) rotateX(${offsetY / 50}deg) rotateY(${offsetX / 50}deg)`,
      }}
      >
      </div>

      <SignInHeader />
        
      <div className="flex w-screen h-full space-x-10 sm:space-x-0 sm:px-8 halflg:space-x-4 z-10">

        <div className="flex w-1/2 h-full justify-center items-center pl-32 halflg:pl-14 sm:hidden">
          <Image 
            className="w-fit h-fit"
            src={'/signin.png'}
            alt="boy sitting at computer"
            width={"1080"}
            height={"1080"}
            quality={100}
            priority
            
          />
        </div>

        <div className="flex flex-col w-1/2 sm:w-full h-full justify-center pr-32 sm:pr-0 halflg:pr-14">

          <div className="flex flex-col space-y-8 tall:space-y-2 w-full my-8 tall:my-4">
            <p className='text-5xl halflg:text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text tall:text-2xl'>Sign In to Knovel Protocol</p>
            <p className="text-white">If you don't have an account, you can <Link href="/signup" className="text-[#4461F2] font-bold">Register here!</Link> </p>
          </div>

          
          <Signinform login={login}/>
        
        </div>
        
      </div>
        
    </main>
  )
}

export default signin