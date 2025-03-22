/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import pokemonGenerations from '@/data/pokemonGenerations';
import GenerationButton from './GenerationButton';

const GenerationsContainer = () => {
  return (
    <div className="flex flex-wrap">
      {pokemonGenerations.map((generation: any, index) => {
        return (
          <GenerationButton key={index} generation={generation} />
        );
      })}
    </div>
  );
};

export default GenerationsContainer;
