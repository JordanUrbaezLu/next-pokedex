'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import pokemonGenerations from '@/data/pokemonGenerations';
import fetchPokemonDataParser from '@/utils/fetchPokemonDataParser';
import GenerationsContainer from './GenerationsContainer';

const GLOBAL_LIMIT = 20;

const Pokedex = () => {
  const [pokemonList, setPokemonList] = React.useState<any[]>([]);
  const [currentGen, setCurrentGen] = React.useState(
    pokemonGenerations[0]
  );
  const [currentIndex, setCurrentIndex] = React.useState(20);

  React.useEffect(() => {
    const limit =
      currentIndex > currentGen.end
        ? currentIndex - currentGen.end
        : GLOBAL_LIMIT;
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentIndex - GLOBAL_LIMIT}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        const pokeList = await fetchPokemonDataParser(data.results);
        setPokemonList((prev) => [...prev, ...pokeList]);
      });
  }, [currentIndex, currentGen]);

  const handleLoadMore = () => {
    setCurrentIndex((prev) => prev + GLOBAL_LIMIT);
  };

  const handleSetGeneration = (generation: any) => {
    setPokemonList([]);
    setCurrentIndex(generation.start + 20);
    setCurrentGen(generation);
  };

  return (
    <>
      <GenerationsContainer
        handleSetGeneration={handleSetGeneration}
        currentGen={currentGen}
      />
      <PokemonCardsContainer pokemonList={pokemonList} />
      {currentIndex <= currentGen.end && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </>
  );
};

export default Pokedex;
