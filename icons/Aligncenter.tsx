import React from "react";

type Props = {
  className ?:string; 
};

function Aligncenter({className}: Props) {
  return (
    <svg
      width="24px"
      height="24px"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 6H21"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M3 14H21"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M6 10L18 10"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M6 18L18 18"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
}

export default Aligncenter;