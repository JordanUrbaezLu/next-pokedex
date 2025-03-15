import { PokemonData } from "@/types/PokemonData";
import React from "react";

const PokemonCard = ({ pokemon }: { pokemon: PokemonData }) => {
  return (
    <div>
      {pokemon.id} {pokemon.name} Height: {pokemon.height}
    </div>
  );
};

export default PokemonCard;
