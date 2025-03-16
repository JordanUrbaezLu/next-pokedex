import { PokemonRegions } from "@/types/PokemonRegions";
import React from "react";
import RegionButton from "./GenerationButton";
import pokemonGenerations from "@/data/pokemonGenerations";
import GenerationButton from "./GenerationButton";

const GenerationsContainer = ({ handleSetGeneration }: { handleSetGeneration: any }) => {
  return (
    <div className="flex flex-wrap">
      {pokemonGenerations.map((generation: any, index) => {
        return (
          <GenerationButton
            key={index}
            generation={generation}
            handleClick={() => handleSetGeneration(generation)}
          />
        );
      })}
    </div>
  );
};

export default GenerationsContainer;
