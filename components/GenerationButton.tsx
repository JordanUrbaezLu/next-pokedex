/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';

const GenerationButton = ({
  generation,
  handleClick,
  disabled,
}: {
  generation: any;
  handleClick: any;
  disabled: boolean;
}) => {
  return (
    <div className="flex">
      <button
        onClick={handleClick}
        className="p-2 m-2 rounded-md bg-gray-300 cursor-pointer bg-sky-200 cursor-pointer hover:bg-sky-300 active:bg-sky-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
        disabled={disabled}
      >
        {generation.name}
      </button>
    </div>
  );
};

export default GenerationButton;
