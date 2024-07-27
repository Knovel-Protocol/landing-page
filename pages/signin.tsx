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
        
      <div className="flex w-screen h-full space-x-10 z-10">

        <div className="flex w-1/2 h-full justify-center items-center pl-32">
          <Image 
            className="w-fit h-fit"
            src={'/books.png'}
            alt="boy sitting at computer"
            width={"2160"}
            height={"2160"}
            quality={100}
            
          />
        </div>

        <div className="flex flex-col w-1/2 h-full justify-center pr-32">

          <div className="flex flex-col space-y-8 w-full my-8">
            <p className='text-5xl font-bold bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text'>Sign In to Knovel Protocol</p>
            <p className="text-white">If you don't have an account, you can <Link href="/signup" className="text-[#4461F2] font-bold">Register here!</Link> </p>
          </div>

          

          <div className="w-full space-y-3">
            <input type="email" placeholder='email' className="w-full py-4 px-4 rounded-xl focus:outline-none" required/>
            <input type="password" placeholder="password" className="w-full focus:outline-none py-4 px-4 rounded-xl" required/>

            <p className="text-white font-light text-sm text-right">Forgot password?</p>
          </div>

          <div className="w-full flex flex-col mt-10 space-y-8">

            <Button 
              title="Sign In"
              buttonRadius="rounded-xl"
            />

      
            <div className="flex space-x-2 items-center justify-center text-white font-light">
              <div className="w-1/4 border-t border-stone-200"></div>
              <p>Or continue with</p>
              <div className="w-1/4 border-t border-stone-200"></div>
            </div>

            <div className="flex w-full space-x-4 p-1">
              <Google className="w-1/3 size-14 border p-3 rounded-xl hover:cursor-pointer border-gray-500 hover:bg-white"/>
              <Apple className="w-1/3 size-14 fill-white hover:fill-black border p-3 rounded-xl hover:cursor-pointer border-gray-500 hover:bg-white"/>
              <Facebook className="w-1/3 size-14 border p-3 rounded-xl hover:cursor-pointer border-gray-500 hover:bg-white"/>
            </div>
          </div>

        </div>
        
      </div>
        
    </main>
  )
}

export default signin