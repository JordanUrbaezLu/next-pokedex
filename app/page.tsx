//import Image from "next/image";

import PokemonCard from "@/components/PokemonCard";
import { PokemonData } from "@/types/PokemonData";
import pokemonDataParser from "@/utils/pokemonDataParser";

export default async function Home() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const first20pokemon = await response.json();
  const pokemonList = await Promise.all(
    first20pokemon.results.map(async (pokemon: any) => {
      const pokemonFetcher = await fetch(pokemon.url);
      const pokemonData = await pokemonFetcher.json();
      return pokemonData;
    })
  );
  const newPokemonList = pokemonDataParser(pokemonList);

  return (
    <div className="p-8">
      {newPokemonList.map((pokemon: PokemonData) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
}
