/* eslint-disable  @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

/**
 * @description
 * Each individual generation button in the generation container
 */

const GenerationButton = ({ generation }: { generation: any }) => {
  return (
    <div className="flex ml-3 translate-x-95 mt-2">
      <Link
        className="translate-x-95 p-2 mb-3 mt-4 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 active:bg-gray-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-xs font-bold"
        href={generation.href}
      >
        {generation.name}
      </Link>
    </div>
  );
};

export default GenerationButton;
