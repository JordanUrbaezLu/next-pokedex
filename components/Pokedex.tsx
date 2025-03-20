'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import GenerationsContainer from './GenerationsContainer';
import LoadMoreButton from './LoadMoreButton';
import usePokedexHook from '@/hooks/usePokedexHook';

const Pokedex = ({ initialPokemon }: { initialPokemon?: any[] }) => {
  const {
    pokemonList,
    currentGen,
    currentIndex,
    handleLoadMore,
    handleSetGeneration,
  } = usePokedexHook({ initialPokemon });

  return (
    <>
      <GenerationsContainer
        handleSetGeneration={handleSetGeneration}
        currentGen={currentGen}
      />
      <PokemonCardsContainer pokemonList={pokemonList} />
      <LoadMoreButton
        disabled={currentIndex >= currentGen.end}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
};

export default Pokedex;
