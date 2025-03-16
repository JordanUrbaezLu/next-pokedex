import { PokemonData } from "@/types/PokemonData";
import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonCardsContainer = ({
  pokemonList,
}: {
  pokemonList: PokemonData[];
}) => {
  return (
    <div className="flex flex-wrap">
      {pokemonList.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} />;
      })}
    </div>
  );
};

export default PokemonCardsContainer;
