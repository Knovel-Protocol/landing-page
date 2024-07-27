import Button from '@/buttons/Button';
import SignInHeader from '@/headers/signin-header';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function signup({}: Props) {
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
    <main className={`relative flex flex-col w-screen h-screen items-center justify-center py-10 ${inter.className} overscroll-none`}>
      <div className="absolute inset-0 filter blur z-0 bg-black opacity-50 bg-hero-pattern bg-cover bg-center bg-no-repeat transition-transform duration-400 ease-out"
      style={{
        transform: `translate(${offsetX / 20}px, ${offsetY / 20}px) rotateX(${offsetY / 50}deg) rotateY(${offsetX / 50}deg)`,
      }}
      >
      </div>

      <SignInHeader />

      <div className="flex z-10 w-screen h-full space-x-10">

        <div className="flex flex-col w-1/2 h-full pl-32 items-center justify-center space-y-10">
          <p className='text-5xl font-bold bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text'>Create Account</p>

          <input type="text" placeholder='username' className="w-full py-4 px-4 rounded-xl focus:outline-none" required/>
          <input type="email" placeholder='email' className="w-full py-4 px-4 rounded-xl focus:outline-none" required/>
          <input type="password" placeholder="password" className="w-full focus:outline-none py-4 px-4 rounded-xl" required/>
          <input type="password" placeholder="confirm password" className="w-full focus:outline-none py-4 px-4 rounded-xl" required/>

          <Link href="/" className="w-full">
            <Button 
              title='Create Account'
              buttonRadius='rounded-xl'
            />
          </Link>


          <div className="w-full flex space-x-2 items-center justify-center text-white font-light">
                <div className="w-1/6 border-t border-stone-200"></div>
                <p>Or</p>
                <div className="w-1/6 border-t border-stone-200"></div>
          </div>

          <Link href="/signin" className="text-stone-200">Already have an account?</Link>


        </div>

        {/* Girl sitting image */}
        <div className="flex flex-col w-1/2 h-full justify-center">
          <Image 
            className="w-fit h-fit"
            src={'/signup.png'}
            alt="boy sitting at computer"
            width={"2160"}
            height={"2160"}
            quality={100}
          />
        </div>

      </div>

     
    </main>
  )
}

export default signup