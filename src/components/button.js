import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button type='button' onClick={onClick} className='button'>
      {children}
    </button>
  );
}
