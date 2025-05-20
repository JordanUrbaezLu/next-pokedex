'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import React from 'react';

/**
 * @description
 * The Button used across the app for navigation or action handling
 */

const Button = ({
  name,
  href,
  onClick,
}: {
  name: string;
  href?: any;
  onClick?: any;
}) => {
  return href ? (
    <Link
      href={href}
      className="inline-block px-2 py-2 text-white bg-red-700 rounded-full 
             shadow-md hover:shadow-lg active:shadow-sm 
             hover:bg-red-800 active:bg-red-900 
             active:scale-90 transition-all duration-100 text-sm"
    >
      {name}
    </Link>
  ) : (
    <button
    className="inline-block p-2 px-5 py-2.5 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
