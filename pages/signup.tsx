import { createAccount } from '@/app/actions/login';
import Signupform from '@/app/forms/Signupform';
import SignInHeader from '@/headers/signin-header';
import { Inter } from 'next/font/google';
import Image from 'next/image';
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

      <div className="flex z-10 w-screen h-full space-x-10 halflg:space-x-4 sm:space-x-0">

        <div className="flex w-1/2 sm:w-full sm:px-8">
          <Signupform createAccount={createAccount}/>

        </div>

        {/* Girl sitting image */}
        <div className="flex flex-col w-1/2 h-full justify-center sm:hidden">
          <Image 
            className="w-fit h-fit"
            src={'/signup.png'}
            alt="boy sitting at computer"
            width={"2160"}
            height={"2160"}
            quality={100}
            priority
          />
        </div>

      </div>

     
    </main>
  )
}

export default signup