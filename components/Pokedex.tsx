"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import PokemonCardsContainer from "@/components/PokemonCardsContainer";
import pokemonGenerations from "@/data/pokemonGenerations";
import fetchPokemonDataParser from "@/utils/fetchPokemonDataParser";
import GenerationsContainer from "./GenerationsContainer";
import DisplayedCard from "./DisplayedCard";
import { PokemonData } from "@/types/PokemonData";

const GLOBAL_LIMIT = 20;

const Pokedex = () => {
  const [pokemonList, setPokemonList] = React.useState<any[]>([]);
  const [currentGen, setCurrentGen] = React.useState(pokemonGenerations[0]);
  const [currentIndex, setCurrentIndex] = React.useState(20);
  const [isDisplayedCardOpen, setIsDisplayedCardOpen] =
    React.useState<boolean>(false);
  const [displayedPokemon, setDisplayedPokemon] = React.useState<PokemonData>(pokemonList[0]);

  React.useEffect(() => {
    const limit =
      currentIndex > currentGen.end
        ? currentIndex - currentGen.end
        : GLOBAL_LIMIT;
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentIndex - GLOBAL_LIMIT}`,
    )
      .then((res) => res.json())
      .then(async (data) => {
        const pokeList = await fetchPokemonDataParser(data.results);
        setPokemonList((prev) => [...prev, ...pokeList]);
      });
  }, [currentIndex]);

  const handleLoadMore = () => {
    setCurrentIndex((prev) => prev + GLOBAL_LIMIT);
  };

  const handleSetGeneration = (generation: any) => {
    setPokemonList([]);
    setCurrentIndex(generation.start + 20);
    setCurrentGen(generation);
  };
  console.log(currentIndex);

  const handleSetDisplayedPokemon = (pokemon: PokemonData) => {
    setDisplayedPokemon(pokemon);
    console.log("pokemon", displayedPokemon);
  };
  
  const handleIsDisplayedCardOpen = () => {
    setIsDisplayedCardOpen(true);
    console.log("hello")
  }

  return (
    <>
      <GenerationsContainer
        handleSetGeneration={handleSetGeneration}
        currentGen={currentGen}
      />
      <PokemonCardsContainer
        pokemonList={pokemonList}
        handleSetDisplayedPokemon={handleSetDisplayedPokemon}
        handleIsDisplayedCardOpen={handleIsDisplayedCardOpen}
      />
      {currentIndex <= currentGen.end && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      {isDisplayedCardOpen && <DisplayedCard displayedPokemon={displayedPokemon} handleIsDisplayedCardOpen={handleIsDisplayedCardOpen} />}
    </>
  );
};

export default Pokedex;
