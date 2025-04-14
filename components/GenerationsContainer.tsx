'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import pokemonGenerations from '@/data/pokemonGenerations';
import GenerationButton from './GenerationButton';

const GenerationsContainer = () => {
  const router = useRouter();

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedHref = e.target.value;
    if (selectedHref) {
      router.push(selectedHref);
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="block md:hidden mb-4">
        <select
          onChange={handleSelectChange}
          defaultValue=""
          className="w-1/2 px-4 py-2 border-2 border-sky-500 rounded-md bg-sky-200 text-xs font-bold shadow-lg focus:ring-2 focus:ring-sky-400"
        >
          <option value="" disabled>
            Select a generation
          </option>
          {pokemonGenerations.map((gen: any, index: number) => (
            <option key={index} value={gen.href}>
              {gen.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex md:flex-wrap">
        {pokemonGenerations.map((generation: any, index) => (
          <GenerationButton key={index} generation={generation} />
        ))}
      </div>
    </div>
  );
};

export default GenerationsContainer;
