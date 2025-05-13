'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import pokemonGenerations from '@/data/pokemonGenerations';
import GenerationButton from './GenerationButton';
import ShinyToggle from './ShinyToggle';

/**
 * @description
 * Container that holds the generation buttons
 */

const GenerationsContainer = () => {
  return (
    <div className="flex flex-wrap">
      <div className="fixed top-4 right-4 z-50 p-2 ">
        <ShinyToggle />
      </div>
      {pokemonGenerations.map((generation: any, index) => {
        return (
          <GenerationButton key={index} generation={generation} />
        );
      })}
    </div>
  );
};

export default GenerationsContainer;
