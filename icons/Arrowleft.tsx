import React from "react";

type Props = {
  className ?: string;
};

function Arrowleft({className}: Props) {
  return (
    <svg
      width="15px"
      height="15px"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default Arrowleft;
