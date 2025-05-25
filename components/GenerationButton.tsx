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
        className="
        translate-x-95 p-2 mb-3 mt-4
        rounded-lg bg-gradient-to-b from-slate-500 to-zinc-400
        hover:bg-gray-300 hover:from-gray-300 hover:to-gray-300 hover:bg-gradient-to-b
        active:bg-gray-100
        cursor-pointer shadow-md hover:shadow-lg
        transition-colors duration-200 ease-out
        text-xs font-bold
      "
        href={generation.href}
      >
        {generation.name}
      </Link>
    </div>
  );
};

export default GenerationButton;
