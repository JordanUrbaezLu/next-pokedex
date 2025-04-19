'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import LoadMoreButton from '@/components/LoadMoreButton';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import usePokedexHook from '@/hooks/usePokedexHook';
import React from 'react';
import pokemonGenerations from '@/data/pokemonGenerations';
import isValidParams from '@/utils/isValidParam';
import { notFound } from 'next/navigation';

/**
 * @description
 * Generations page that uses URL route to determine the generation to display
 */

const Generation = ({ params }: { params: any }) => {
  const param = React.use(params) as any;
  const validParams = isValidParams(param);
  if (!validParams) {
    notFound();
  }

  const { pokemonList, handleLoadMore, currentIndex, currentGen } =
    usePokedexHook({
      generation: pokemonGenerations[parseInt(param?.gen) - 1],
    });

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
