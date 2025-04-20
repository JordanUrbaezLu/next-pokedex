'use client';

import Link from 'next/link';
import React from 'react';

const LoginButton = () => {
  return (
    <div className="absolute top-22 right-8 z-10">
      <Link
        href="/login"
        className="p-2 m-2 rounded-md border-3 border-green-500 bg-green-200 cursor-pointer hover:bg-green-300 active:bg-green-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default LoginButton;
