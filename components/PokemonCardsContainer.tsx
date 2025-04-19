import { PokemonData } from '@/types/PokemonData';
import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonCardsContainer = ({
  pokemonList,
}: {
  pokemonList: PokemonData[];
}) => {
  const [shiny, setShiny] = React.useState(false);
  return (
    <div className="flex flex-wrap">
      <button
        className="p-2 m-2 rounded-md border-3 border-sky-500 bg-sky-200 cursor-pointer hover:bg-sky-300 active:bg-sky-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
        onClick={() => setShiny(!shiny)}
      >
        Set to Shiny
      </button>
      {pokemonList.map((pokemon, index) => {
        return (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            useShiny={shiny}
          />
        );
      })}
    </div>
  );
};

export default PokemonCardsContainer;
