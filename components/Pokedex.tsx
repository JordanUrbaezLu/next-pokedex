'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import PokemonCardsContainer from '@/components/PokemonCardsContainer';
import pokemonGenerations from '@/data/pokemonGenerations';
import fetchPokemonDataParser from '@/utils/fetchPokemonDataParser';
import GenerationsContainer from './GenerationsContainer';
import DisplayedCard from './DisplayedCard';

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
  const [isDisplayedCardOpen, setIsDisplayedCardOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!preventInitialRequest) {
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
  }, [currentIndex, currentGen]);

  const handleLoadMore = () => {
    setCurrentIndex((prev) => prev + GLOBAL_LIMIT);
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
      {currentIndex <= currentGen.end && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      {isDisplayedCardOpen && <DisplayedCard />}
    </>
  );
};

export default Pokedex;
