'use client';
import LoadMoreButton from '@/components/LoadMoreButton';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import usePokedexHook from '@/hooks/usePokedexHook';
import React from 'react';

const Generation = () => {
  const { pokemonList, handleLoadMore, currentIndex, currentGen } =
    usePokedexHook({});

  return (
    <>
      <PokemonCardsContainer pokemonList={pokemonList} />
      <LoadMoreButton
        scrollUp={currentIndex >= currentGen.end}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
};

export default Generation;
