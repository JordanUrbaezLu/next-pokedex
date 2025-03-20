/* eslint-disable  @typescript-eslint/no-explicit-any */
import pokemonGenerations from '@/data/pokemonGenerations';
import fetchPokemonDataParser from '@/utils/fetchPokemonDataParser';
import React from 'react';

const GLOBAL_LIMIT = 20;

const usePokedexHook = ({
  initialPokemon,
}: {
  initialPokemon?: any[];
}) => {
  const [pokemonList, setPokemonList] = React.useState<any[]>(
    initialPokemon?.slice(0, 20) ?? []
  );
  const [next20, setNext20] = React.useState<any[]>(
    initialPokemon?.slice(21, 40) ?? []
  );
  const [currentGen, setCurrentGen] = React.useState(
    pokemonGenerations[0]
  );
  const [currentIndex, setCurrentIndex] = React.useState(20);
  const [preventInitialRequest, setPreventInitialRequest] =
    React.useState<boolean>(!!initialPokemon);

  React.useEffect(() => {
    if (!preventInitialRequest) {
      //generation switch
      if (currentGen.start === currentIndex - GLOBAL_LIMIT) {
        fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${GLOBAL_LIMIT}&offset=${currentIndex - GLOBAL_LIMIT}`
        )
          .then((res) => res.json())
          .then(async (data) => {
            const pokeList = await fetchPokemonDataParser(
              data.results
            );
            setPokemonList(pokeList);
          });
      } else {
        // use prefetched next 20 pokemon
        setPokemonList((prev) => [...prev, ...next20]);
      }
    } else {
      setPreventInitialRequest(!preventInitialRequest);
    }
  }, [currentIndex, currentGen, preventInitialRequest]);

  // prefetch next 20 pokemon in current generation
  React.useEffect(() => {
    if (currentIndex < currentGen.end) {
      // determine limit so we never fetch pokemon from the next gen
      const limit =
        currentIndex + GLOBAL_LIMIT < currentGen.end
          ? GLOBAL_LIMIT
          : currentGen.end - currentIndex;
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentIndex}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          const pokeList = await fetchPokemonDataParser(data.results);
          setNext20(pokeList);
        });
    }
  }, [pokemonList]);

  const handleLoadMore = (scrollUp?: boolean) => {
    setCurrentIndex((prev) => {
      if (prev + GLOBAL_LIMIT < currentGen.end) {
        return prev + GLOBAL_LIMIT;
      } else {
        return currentGen.end;
      }
    });
    setTimeout(() => {
      window.scrollTo({
        top: scrollUp ? 0 : document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 75);
  };

  const handleSetGeneration = (generation: any) => {
    setCurrentIndex(generation.start + GLOBAL_LIMIT);
    setCurrentGen(generation);
  };

  return {
    pokemonList,
    setPokemonList,
    currentGen,
    setCurrentGen,
    currentIndex,
    setCurrentIndex,
    handleLoadMore,
    handleSetGeneration,
  };
};

export default usePokedexHook;
