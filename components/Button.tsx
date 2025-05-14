'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import React from 'react';

/**
 * @description
 * The Button used across the app for navigation
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
      className="p-2 m-2 rounded-md border-3 border-green-500 bg-green-200 cursor-pointer hover:bg-green-300 active:bg-green-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
    >
      {name}
    </Link>
  ) : (
    <button
      className="p-2 m-2 rounded-md border-3 border-green-500 bg-green-200 cursor-pointer hover:bg-green-300 active:bg-green-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
