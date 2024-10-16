import React from "react";

type Props = {
  className ?: string;
};

function Arrowright({className}: Props) {
  return (
    <svg
      width="15px"
      height="15px"
      viewBox="0 0 24 24"
      strokeWidth="4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default Arrowright;
