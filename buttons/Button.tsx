import React from 'react'

type Props = {
  title ?: string;
}

function Button({title}: Props) {
  return (
    <div className=" relative text-center rounded-3xl px-10 py-4 bg-white/30 overflow-hidden font-semibold group hover:cursor-pointer text-white">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shine">
      </div>
      <p>{title}</p>
    </div>
   
  )
}

export default Button