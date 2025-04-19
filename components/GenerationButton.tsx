/* eslint-disable  @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

/**
 * @description
 * Each individual generation button in the generation container
 */

const GenerationButton = ({ generation }: { generation: any }) => {
  return (
    <div className="flex">
      <Link
        className="p-2 m-2 rounded-md border-3 border-sky-500 bg-sky-200 cursor-pointer hover:bg-sky-300 active:bg-sky-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
        href={generation.href}
      >
        {generation.name}
      </Link>
    </div>
  );
};

export default GenerationButton;
