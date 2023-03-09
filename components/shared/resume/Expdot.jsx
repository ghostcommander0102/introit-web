import React from "react";

export default function Expdot(props) {
  return props.type == 1 ? (
    <svg
      key={1}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1_4710" fill="white">
        <path d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z" />
      </mask>
      <path
        d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6Z"
        fill="#6B7598"
      />
      <path
        d="M0 0H12H0ZM12 12H0H12ZM-18 12C-21.3137 12 -24 9.31371 -24 6C-24 2.68629 -21.3137 0 -18 0H6C7.5913 2.78232e-07 9.11742 0.632142 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6V6V0V6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12H-18ZM12 0V12V0Z"
        fill="#242435"
        mask="url(#path-1-inside-1_1_4710)"
      />
    </svg>
  ) : props.type == 0 ? (
    <svg
      key={0}
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1_4713" fill="white">
        <path d="M0.5 6C0.5 2.68629 3.18629 0 6.5 0C9.81371 0 12.5 2.68629 12.5 6C12.5 9.31371 9.81371 12 6.5 12C3.18629 12 0.5 9.31371 0.5 6Z" />
      </mask>
      <path
        d="M0.5 6C0.5 2.68629 3.18629 0 6.5 0C9.81371 0 12.5 2.68629 12.5 6C12.5 9.31371 9.81371 12 6.5 12C3.18629 12 0.5 9.31371 0.5 6Z"
        fill="#6B7598"
      />
      <path
        d="M0.5 0H12.5H0.5ZM12.5 12H0.5H12.5ZM0.5 12C-2.81371 12 -5.5 9.31371 -5.5 6C-5.5 2.68629 -2.81371 0 0.5 0H6.5C6.5 0 6.5 2.68629 6.5 6C6.5 9.31371 6.5 12 6.5 12H0.5ZM12.5 0V12V0Z"
        fill="#242435"
        mask="url(#path-1-inside-1_1_4713)"
      />
    </svg>
  ) : (
    <svg
      key={3}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="12" height="12" rx="6" fill="#6B7598" />
    </svg>
  );
}
