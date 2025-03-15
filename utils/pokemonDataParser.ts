import { PokemonData } from "@/types/PokemonData";

export default function pokemonDataParser(pokemonList: any[]): PokemonData[] {
  return pokemonList.map((pokemon) => {
    console.log(pokemon);
    return { id: pokemon.id, name: pokemon.name, height: pokemon.height };
  });
}
