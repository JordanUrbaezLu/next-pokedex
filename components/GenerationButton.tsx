/* eslint-disable  @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

const GenerationButton = ({ generation }: { generation: any }) => {
  return (
    <div className="flex">
      <div className="p-2 m-2 rounded-md border-3 border-sky-500 bg-sky-200 cursor-pointer hover:bg-sky-300 active:bg-sky-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold">
        <Link href={generation.href}>{generation.name}</Link>
      </div>
    </div>
  );
};

export default GenerationButton;
