import { PokemonRegions } from '@/types/PokemonRegions';

export default async function getPokemonRegions(): Promise<
  PokemonRegions[]
> {
  const regions = await fetch(
    'https://pokeapi.co/api/v2/region'
  ).then((res) => res.json());
  return regions.results;
}
