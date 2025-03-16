import { PokemonRegions } from "@/types/PokemonRegions";
import React from "react";

const GenerationButton = ({
  generation,
  handleClick,
}: {
  generation: any;
  handleClick: any;
}) => {
  return (
    <div className="flex">
      <img src={generation.url} width="100px" height="50px" />
      <button
        onClick={handleClick}
        className="p-2 m-2 cursor-pointer bg-red-50 hover:bg-red-200 active:bg-red-400 text-black rounded-md"
      >
        {generation.name}
      </button>
    </div>
  );
};

export default GenerationButton;
