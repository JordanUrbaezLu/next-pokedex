import { PokemonData } from "@/types/PokemonData";
import React from "react";
import Image from "next/image";
import pokemonTypes from "../data/pokemonTypes";

const PokemonCard = ({ pokemon }: { pokemon: PokemonData }) => {
  const [loading, setLoading] = React.useState(true);

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const id = "#" + pokemon?.id?.toString().padStart(4, "0");

  return (
    <div className="flex-col p-4 m-2 items-center justify-center w-[200px] rounded-md bg-gray-300 cursor-pointer hover:bg-gray-200 active:bg-gray-400">
      {loading && <p className="h-[168px]">Loading image...</p>}
      <img
        src={pokemon?.img || ""}
        width={168}
        height={168}
        alt={`${name} image`}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? "none" : "block" }}
      />
      <div>{id}</div>
      <div className="flex gap-[10px] px-[5px]">
        {pokemon?.type1 && (
          <img
            src={pokemonTypes[pokemon.type1]}
            width={70}
            height={70}
            alt={`${pokemon.type1} type image`}
          />
        )}
        {pokemon?.type2 && (
          <img
            src={pokemonTypes[pokemon.type2]}
            width={70}
            height={70}
            alt={`${pokemon.type2} type image`}
          />
        )}
      </div>
      <div className="text-center">{name}</div>
    </div>
  );
};

export default PokemonCard;
