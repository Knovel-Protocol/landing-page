'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Hidden from '@/icons/Hidden'
import { signup } from '@/app/login/actions'


function Signupform({}) {
  const [error, setError] = useState<string | null>(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword)
  }

  const toggleShowPassword2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword)
  }


  return (
    <form className="flex flex-col w-full h-full pl-32 lg:pl-20 md:pl-10 sm:pl-0 items-center justify-center space-y-4">
      <p className='text-5xl font-bold bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text mb-4'>Create Account</p>

      {/* <input id="name" type="text" placeholder='fullname' className="w-full py-4 px-4 rounded-xl focus:outline-none" required/> */}

      {/* <input id="username" type="text" placeholder='username' className="w-full py-4 px-4 rounded-xl focus:outline-none" required/> */}
      <input id="email" name="email" type="email" placeholder="email" required className="w-full py-4 px-4 rounded-xl focus:outline-none"/>

      <div className="relative w-full">
        <input 
          id="password" 
          name="password" 
          placeholder="password"
          type={showPassword1 ? "text" : "password"} 
          required 
          className="w-full focus:outline-none py-4 px-4 rounded-xl"
        />
        <span
          onClick={toggleShowPassword} 
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
        >
          {showPassword1 ? <Hidden fill="#94a3b8" className="size-6 stroke-slate-400"/> :  <Hidden fill="#94a3b8" className="size-6 stroke-slate-400"/>}
        </span>
      </div>

      <div className="relative w-full">
        <input 
          id="confirm password" 
          type={showPassword2 ? "text" : "password"} 
          placeholder="confirm password" 
          className="w-full focus:outline-none py-4 px-4 rounded-xl" 
          required
        />
        <span
          onClick={toggleShowPassword2} 
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
        >
          {showPassword2 ? <Hidden fill="#94a3b8" className="size-6 stroke-slate-400"/> :  <Hidden fill="#94a3b8" className="size-6 stroke-slate-400"/>}
        </span>

      </div>

      <button
        formAction={signup}
        className="relative w-full text-center px-10 py-4 bg-white/30 rounded-xl overflow-hidden font-semibold text-white">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shine2">
        </div>
        Create Account
      </button>

      <div className="w-full flex space-x-2 items-center justify-center text-white font-light">
        <div className="w-1/6 border-t border-stone-200"></div>
        <p>Or</p>
        <div className="w-1/6 border-t border-stone-200"></div>
      </div>

      <Link href="/signin" className="text-stone-200">Already have an account?</Link>

  </form>
  )
}

export default Signupform