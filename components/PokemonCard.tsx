/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
import { PokemonData } from '@/types/PokemonData';
import React from 'react';
import pokemonTypes from '../data/pokemonTypes';
import { track } from '@vercel/analytics';
import RingLoader from 'react-spinners/RingLoader';

const PokemonCard = ({
  pokemon,
  useShiny,
}: {
  pokemon: PokemonData;
  useShiny?: boolean;
}) => {
  const [loading, setLoading] = React.useState(true);

  // wait for image to be completely loaded before you remove loader
  React.useEffect(() => {
    const img = new Image();
    img.src = pokemon?.img || '';
    if (img.complete) {
      setLoading(false);
    }
  }, [pokemon]);

  return (
    <div
      className="flex flex-col items-center justify-center 
                 w-[120px] md:w-[200px] 
                 max-h-[230px] md:max-h-[265px] 
                 p-1 md:p-4 
                 m-1 md:m-2 
                 rounded-md 
                 border-2 md:border-3 border-sky-500 
                 bg-sky-200 
                 cursor-pointer 
                 hover:bg-sky-300 active:bg-sky-500 
                 shadow-md hover:shadow-lg 
                 transition-colors duration-200 ease-out 
                 text-xs md:text-sm font-bold pokemon-font"
      onClick={() => track(pokemon.name)}
    >
      {loading && (
        <div className="p-2 md:p-[20px]">
          <RingLoader
            color="#ffffff"
            loading={loading}
            size={80} // smaller spinner for mobile
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <img
        className="max-h-[120px] min-h-[120px] max-w-[120px] min-w-[120px] md:max-h-[168px] md:min-h-[168px] md:max-w-[168px] md:min-w-[168px]"
        src={useShiny ? pokemon?.shinyImg : pokemon?.img}
        width={120}
        height={120}
        alt={`${pokemon.name} image`}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />

      <div className="mt-1 md:mt-2">{pokemon.id}</div>

      <div className="flex gap-[6px] md:gap-[10px] px-[2px] md:px-[5px] mt-1">
        {pokemon?.type1 && (
          <img
            className="aspect-[4/1] w-[50px] md:w-[70px]"
            src={pokemonTypes[pokemon.type1]}
            alt={`${pokemon.type1} type image`}
          />
        )}
        {pokemon?.type2 && (
          <img
            className="aspect-[4/1] w-[50px] md:w-[70px]"
            src={pokemonTypes[pokemon.type2]}
            alt={`${pokemon.type2} type image`}
          />
        )}
      </div>

      <div className="text-center mt-1">{pokemon.name}</div>
    </div>
  );
};

export default PokemonCard;
