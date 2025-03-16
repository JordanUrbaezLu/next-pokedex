/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import pokemonGenerations from "@/data/pokemonGenerations";
import GenerationButton from "./GenerationButton";

const GenerationsContainer = ({
  handleSetGeneration,
  currentGen,
}: {
  handleSetGeneration: any;
  currentGen: any;
}) => {
  return (
    <div className="flex flex-wrap">
      {pokemonGenerations.map((generation: any, index) => {
        return (
          <GenerationButton
            key={index}
            generation={generation}
            handleClick={() => handleSetGeneration(generation)}
            disabled={generation.name === currentGen.name}
          />
        );
      })}
    </div>
  );
};

export default GenerationsContainer;
