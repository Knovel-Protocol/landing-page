import React from 'react'

type Props = {}

function LoadingPage({}: Props) {
  return (
    <div className="flex w-full h-full bg-black items-center justify-center">
      <img 
        src="/knovel-logo-white.png"
        className="w-1/6"
      />
    </div>
  )
}

export default LoadingPage