'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import React from 'react';

/**
 * @description
 * The Button used across the app for navigation
 */

interface ButtonProps {
  name: string;
  href: string;
}

const Button = ({ name, href }: ButtonProps) => {
  return (
    <Link
      href={href}
      className="inline-block px-2 py-2 text-white bg-red-700 rounded-full 
             shadow-md hover:shadow-lg active:shadow-sm 
             hover:bg-red-800 active:bg-red-900 
             active:scale-90 transition-all duration-100 text-sm"
    >
      {name}
    </Link>
  );
};

export default Button;
