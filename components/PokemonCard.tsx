/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
import { PokemonData } from '@/types/PokemonData';
import React from 'react';
import pokemonTypes from '../data/pokemonTypes';
import { track } from '@vercel/analytics';
import RingLoader from 'react-spinners/RingLoader';

const PokemonCard = ({ pokemon }: { pokemon: PokemonData }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.src = pokemon?.img || '';
    if (img.complete) {
      setLoading(false);
    }
  }, [pokemon]);

  const name =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const id = '#' + pokemon?.id?.toString().padStart(4, '0');

  return (
    <div
      className="flex-col p-4 m-2 items-center justify-center w-[200px] max-h-[265px] rounded-md border-3 border-sky-500 bg-sky-200 cursor-pointer hover:bg-sky-300 active:bg-sky-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold pokemon-font"
      onClick={() => track(name)}
    >
      {loading && (
        <div className="p-[20px]">
          <RingLoader
            color="#ffffff"
            loading={loading}
            size={128}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <img
        className="max-h-[168px] min-h-[168px] max-w-[168px] min-w-[168px]"
        src={pokemon?.img || ''}
        width={168}
        height={168}
        alt={`${name} image`}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
      <div>{id}</div>
      <div className="flex gap-[10px] px-[5px]">
        {pokemon?.type1 && (
          <img
            className="aspect-4/1"
            src={pokemonTypes[pokemon.type1]}
            width={70}
            height={70}
            alt={`${pokemon.type1} type image`}
          />
        )}
        {pokemon?.type2 && (
          <img
            className="aspect-4/1"
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
