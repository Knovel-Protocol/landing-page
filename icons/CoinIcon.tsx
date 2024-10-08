import React from 'react'

type Props = {
  className ?: string;
}

function CoinIcon({className}: Props) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      stroke="url(#gradient)"
      className={className}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF">
            <animate 
              attributeName="stop-color" 
              values="#FFFFFF;#FFDF00;#FFFFFF" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor="#FFDF00">
            <animate 
              attributeName="stop-color" 
              values="#FFDF00;#FFFFFF;#FFDF00" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </stop>
        </linearGradient>
      </defs>
      <path 
        d="M16 13C13.2386 13 11 11.8807 11 10.5C11 9.11929 13.2386 8 16 8C18.7614 8 21 9.11929 21 10.5C21 11.8807 18.7614 13 16 13Z" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M11 14.5C11 15.8807 13.2386 17 16 17C18.7614 17 21 15.8807 21 14.5" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M3 9.5C3 10.8807 5.23858 12 8 12C9.12583 12 10.1647 11.814 11.0005 11.5" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M3 13C3 14.3807 5.23858 15.5 8 15.5C9.12561 15.5 10.1643 15.314 11 15.0002" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M3 5.5V16.5C3 17.8807 5.23858 19 8 19C9.12563 19 10.1643 18.8139 11 18.5" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M13 8.5V5.5" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M11 10.5V18.5C11 19.8807 13.2386 21 16 21C18.7614 21 21 19.8807 21 18.5V10.5" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
      <path 
        d="M8 8C5.23858 8 3 6.88071 3 5.5C3 4.11929 5.23858 3 8 3C10.7614 3 13 4.11929 13 5.5C13 6.88071 10.7614 8 8 8Z" 
        stroke="url(#gradient)"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
      </path>
    </svg>

  )
}

export default CoinIcon