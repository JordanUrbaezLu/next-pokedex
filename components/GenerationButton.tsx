/* eslint-disable  @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

/**
 * @description
 * Each individual generation button in the generation container
 */

const GenerationButton = ({ generation }: { generation: any }) => {
  return (
    <div className="flex pl-2 ml-10 translate-x-30">
      <Link
        className="p-1 mt-2 mb-3 bg-gray-200 cursor-pointer hover:bg-gray-300 active:bg-gray-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-xs font-bold"
        href={generation.href}
      >
        {generation.name}
      </Link>
    </div>
  );
};

export default GenerationButton;
