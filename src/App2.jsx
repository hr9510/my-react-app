import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App2() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen px-4 text-center bg-gradient-to-br from-gray-700 via-gray-500 to-gray-300'>
      <p className='text-[5vw] sm:text-4xl font-bold text-white drop-shadow-lg animate-float-slow'>
        Welcome to our hotel.
        <br />
        <span className="text-[4vw] sm:text-xl font-medium text-gray-100">Hit the button below to enter</span>
      </p>

      <button
        onClick={()=>navigate("/restaunt")}
        className='mt-10 text-[4vw] sm:text-lg font-semibold bg-white text-gray-900 px-6 py-3 rounded-xl shadow-md hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-500'
      >
        Enter the Hotel
      </button>
    </div>
  );
}