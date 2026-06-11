import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="
      fixed top-6 left-1/2 -translate-x-1/2 z-50
      bg-white text-black font-mono font-bold
      px-6 py-3 rounded-full shadow-2xl
      text-sm tracking-wide
      pointer-events-none
    ">
      {message}
    </div>
  );
}
