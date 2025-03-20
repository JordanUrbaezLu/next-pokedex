import React from 'react';
import Pokedex from '@/components/Pokedex';
import Title from '@/components/Title';
import fetchPokemonDataParser from '@/utils/fetchPokemonDataParser';

export default async function Home() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0',
    { cache: 'no-store' }
  ).then((response) => response.json());

  const initialPokemon = await fetchPokemonDataParser(res.results);

  return (
    <div className="p-6">
      <Title />
      <Pokedex initialPokemon={initialPokemon} />
    </div>
  );
}
