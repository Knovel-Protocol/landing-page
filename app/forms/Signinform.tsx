import Apple from '@/logos/Apple'
import Facebook from '@/logos/Facebook'
import Google from '@/logos/Google'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Hidden from '@/icons/Hidden'

type Props = {}
interface SigninformProps {
  login: (formData: FormData) => Promise<{ error?: string }>
}


function Signinform({login}: SigninformProps) {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push('/explore')
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full space-y-3 tall:space-y-1">
      <input type="email" placeholder='email' className="w-full py-4 px-4 rounded-xl focus:outline-none" required/>
      {/* <input type="password" placeholder="password" className="w-full focus:outline-none py-4 px-4 rounded-xl" required/> */}
      <div className="relative w-full">
        <input 
          id="password" 
          name="password" 
          placeholder="password"
          type={showPassword ? "text" : "password"} 
          required 
          className="w-full focus:outline-none py-4 px-4 rounded-xl"
        />
        <span
          onClick={toggleShowPassword} 
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
        >
          {showPassword ? <Hidden fill="#94a3b8" className="size-6 stroke-slate-400"/> :  <Hidden fill="#94a3b8" className="size-6 stroke-slate-400"/>}
        </span>
      </div>


      <p className="text-white font-light text-sm text-right">Forgot password?</p>
      </div>

      <div className="w-full flex flex-col mt-10 space-y-8 tall:space-y-4">

        <button
          type="submit"
          className="relative w-full text-center px-10 py-4 bg-white/30 rounded-xl overflow-hidden font-semibold text-white">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shine2">
          </div>
          Sign In
        </button> 

        <div className="flex space-x-2 items-center justify-center text-white font-light">
          <div className="w-1/4 border-t border-stone-200"></div>
          <p>Or continue with</p>
          <div className="w-1/4 border-t border-stone-200"></div>
        </div>

        <div className="flex w-full space-x-4 tall:items-center tall:justify-center p-1 tall:p-0.5">
          <Google className="w-1/3 size-14 tall:size-12 border p-3 rounded-xl hover:cursor-pointer border-gray-500 hover:bg-white"/>
          <Apple className="w-1/3 size-14 tall:size-12 fill-white hover:fill-black border p-3 rounded-xl hover:cursor-pointer border-gray-500 hover:bg-white"/>
          <Facebook className="w-1/3 size-14 tall:size-12 border p-3 rounded-xl hover:cursor-pointer border-gray-500 hover:bg-white"/>
        </div>
      </div>

  </form>
  )
}

export default Signinform