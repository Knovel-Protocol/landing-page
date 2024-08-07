import React from "react";

type Props = {
  className ?: string;
};

function ConnectIcon({className}: Props) {
  return (
    <svg
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="url(#gradient)"
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
        d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
        stroke="url(#gradient)"
        fill="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 12V15C21 18.3137 18.3137 21 15 21H9C5.68629 21 3 18.3137 3 15V9C3 5.68629 5.68629 3 9 3H12"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default ConnectIcon;
