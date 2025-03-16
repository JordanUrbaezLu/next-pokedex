import React from "react";

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
        className="p-2 m-2 rounded-md bg-gray-300 cursor-pointer hover:bg-gray-200 active:bg-gray-400"
        disabled={disabled}
      >
        {generation.name}
      </button>
    </div>
  );
};

export default GenerationButton;
