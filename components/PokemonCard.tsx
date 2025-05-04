/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
import { PokemonData } from '@/types/PokemonData';
import React from 'react';
import pokemonTypes from '../data/pokemonTypes';
import RingLoader from 'react-spinners/RingLoader';

/**
 * @description
 * Each individual pokemon card that gets rendered
 */

const PokemonCard = ({
  pokemon,
  isShiny,
  handleClick,
}: {
  pokemon: PokemonData;
  isShiny?: boolean;
  handleClick: () => void;
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
    <div className="ml-4 translate-x-2">
      <div
        className="flex flex-col items-center justify-center 
                 w-[120px] md:w-[200px] 
                 max-h-[230px] md:max-h-[265px] 
                 p-1 md:p-4 
                 m-1 md:m-2 
                 bg-white
                 cursor-pointer 
                 hover:bg-gray-300 active:bg-gray-500 
                 shadow-md hover:shadow-lg 
                 transition-colors duration-200 ease-out 
                 text-xs md:text-sm font-bold pokemon-font"
        onClick={handleClick}
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
          src={isShiny ? pokemon?.shinyImg : pokemon?.img}
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
    </div>
  );
};

export default PokemonCard;
