'use client';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import usePokedexHook from '@/hooks/usePokedexHook';
import React from 'react';

const Generation = () => {
  const { pokemonList } = usePokedexHook({});

  return <PokemonCardsContainer pokemonList={pokemonList} />;
};

export default Generation;
