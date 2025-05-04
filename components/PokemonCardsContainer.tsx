import { PokemonData } from '@/types/PokemonData';
import React from 'react';
import PokemonCard from './PokemonCard';
import { useShiny } from '@/contexts/ShinyContext';
import useDisplayCardHook from '@/hooks/useDisplayCardHook';
import DisplayCardModal from './DisplayCardModal';

/**
 * @description
 * The Container that holds all the pokemon cards
 */

const PokemonCardsContainer = ({
  pokemonList,
}: {
  pokemonList: PokemonData[];
}) => {
  const { isShiny } = useShiny();
  const {
    isDisplayCardOpen,
    displayedPokemon,
    handleOpen,
    handleClose,
  } = useDisplayCardHook();

  return (
    <div className="flex flex-wrap mt-1 px-32 gap-[34px] m-6">
      {pokemonList.map((pokemon: PokemonData, index) => {
        return (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            isShiny={isShiny}
            handleClick={() => handleOpen(pokemon)}
          />
        );
      })}
      <DisplayCardModal
        displayedPokemon={displayedPokemon}
        isDisplayCardOpen={isDisplayCardOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default PokemonCardsContainer;
