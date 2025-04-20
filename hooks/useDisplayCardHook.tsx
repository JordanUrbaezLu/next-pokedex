import React from 'react';
import { PokemonData } from '@/types/PokemonData';

/**
 * @description
 * The main hook for the display card modal
 */

const useDisplayCardHook = () => {
  const [isDisplayCardOpen, setIsDisplayCardOpen] =
    React.useState<boolean>(false);
  const [displayedPokemon, setDisplayedPokemon] =
    React.useState<PokemonData | null>(null);
  const handleOpen = (pokemon: any) => {
    setDisplayedPokemon(pokemon);
    setIsDisplayCardOpen(true);
  };
  const handleClose = () => setIsDisplayCardOpen(false);

  return {
    isDisplayCardOpen,
    setIsDisplayCardOpen,
    displayedPokemon,
    setDisplayedPokemon,
    handleOpen,
    handleClose,
  };
};

export default useDisplayCardHook;
