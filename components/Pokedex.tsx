'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import pokemonGenerations from '@/data/pokemonGenerations';
import fetchPokemonDataParser from '@/utils/fetchPokemonDataParser';
import GenerationsContainer from './GenerationsContainer';
import LoadMoreButton from './LoadMoreButton';

const GLOBAL_LIMIT = 20;

const Pokedex = ({
  initial20Pokemon,
}: {
  initial20Pokemon?: any[];
}) => {
  const [pokemonList, setPokemonList] = React.useState<any[]>(
    initial20Pokemon ?? []
  );
  const [currentGen, setCurrentGen] = React.useState(
    pokemonGenerations[0]
  );
  const [currentIndex, setCurrentIndex] = React.useState(20);
  const [preventInitialRequest, setPreventInitialRequest] =
    React.useState<boolean>(!!initial20Pokemon);

  React.useEffect(() => {
    if (!preventInitialRequest) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${GLOBAL_LIMIT}&offset=${currentIndex - GLOBAL_LIMIT}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          const pokeList = await fetchPokemonDataParser(data.results);
          if (currentGen.start === currentIndex - GLOBAL_LIMIT) {
            // generation swap
            setPokemonList(pokeList);
          } else {
            setPokemonList((prev) => [...prev, ...pokeList]);
          }
        });
    } else {
      setPreventInitialRequest(!preventInitialRequest);
    }
  }, [currentIndex, currentGen, preventInitialRequest]);

  const handleLoadMore = () => {
    setCurrentIndex((prev) => {
      if (prev + GLOBAL_LIMIT < currentGen.end) {
        return prev + GLOBAL_LIMIT;
      } else {
        return currentGen.end;
      }
    });
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const handleSetGeneration = (generation: any) => {
    setCurrentIndex(generation.start + GLOBAL_LIMIT);
    setCurrentGen(generation);
  };

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
