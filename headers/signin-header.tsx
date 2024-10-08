import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

function SignInHeader({}: Props) {
  const pathname = usePathname(); 
  return (
    <div className="flex w-full justify-between items-center text-white font-light text-sm px-32 sm:px-8 halflg:px-14 z-10">

      <div className="flex space-x-8 sm:space-x-2 sm:text-xs">
        <Link href="/" className="font-mono">knovel</Link>
        <p>Documentation</p>
      </div>
     

      <div className="flex space-x-8 items-center sm:space-x-3 sm:text-xs">
        <Link className={`link ${pathname === '/signin' ? 'font-semibold underline decoration-2 underline-offset-8 text-[#4461F2]' : 'bg-white rounded-xl text-[#4461F2] p-2 font-semibold'}`} href="/signin">Sign in </Link>

        <Link href="/signup" className={`${pathname === '/signup' ? 'font-semibold underline decoration-2 underline-offset-8 text-[#4461F2]' : 'bg-white rounded-xl text-[#4461F2] p-2 font-semibold'}`}>
          <p>Register</p>
        </Link>
      </div>
      
     
    </div>
  )
}

export default SignInHeader