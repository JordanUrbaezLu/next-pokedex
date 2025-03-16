import { PokemonData } from "@/types/PokemonData";
import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonCardsContainer = ({
  pokemonList,
  handleSetDisplayedPokemon,
  handleIsDisplayedCardOpen
}: {
  pokemonList: PokemonData[];
  handleSetDisplayedPokemon: any;
  handleIsDisplayedCardOpen: any;
}) => {
  return (
    <div className="flex flex-wrap">
      {pokemonList.map((pokemon, index) => {
        return (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            handleSetDisplayedPokemon={handleSetDisplayedPokemon}
            handleIsDisplayedCardOpen={handleIsDisplayedCardOpen}
          />
        );
      })}
    </div>
  );
};

export default PokemonCardsContainer;
