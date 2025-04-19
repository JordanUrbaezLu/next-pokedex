import { PokemonData } from '@/types/PokemonData';
import React from 'react';
import PokemonCard from './PokemonCard';
import { useShiny } from '@/contexts/ShinyProvider';

const PokemonCardsContainer = ({
  pokemonList,
}: {
  pokemonList: PokemonData[];
}) => {
  const { isShiny } = useShiny();

  return (
    <div className="flex flex-wrap">
      {pokemonList.map((pokemon, index) => {
        return (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            isShiny={isShiny}
          />
        );
      })}
    </div>
  );
};

export default PokemonCardsContainer;
