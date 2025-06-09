import Modal from '@mui/material/Modal';
import { PokemonData } from '@/types/PokemonData';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React, { useState, useEffect } from 'react';

/**
 * @description
 * The Display Card that shows when a pokemon card is clicked
 */

const DisplayCardModal = ({
  isDisplayCardOpen,
  handleClose,
  displayedPokemon,
}: {
  isDisplayCardOpen: boolean;
  handleClose: () => void;
  displayedPokemon: PokemonData | null;
}) => {
  const maxStat = 255;

  const FAVORITES_KEY = 'favoritePokemon';

  const getFavoritesFromStorage = (): string[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveFavoritesToStorage = (favorites: string[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!displayedPokemon?.name) return;
    const favorites = getFavoritesFromStorage();
    setIsFavorite(favorites.includes(displayedPokemon.name));
  }, [displayedPokemon]);

  const toggleFavorite = () => {
    const name = displayedPokemon?.name;
    if (!name) return;

    const favorites = getFavoritesFromStorage();
    let updatedFavorites;

    if (favorites.includes(name)) {
      updatedFavorites = favorites.filter((fav) => fav !== name);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, name];
      setIsFavorite(true);
    }

    saveFavoritesToStorage(updatedFavorites);
  };

  const statBarColor = (value: number) => {
    if (value >= 150) return 'bg-red-900';
    if (value >= 125) return 'bg-red-800';
    if (value >= 100) return 'bg-red-600';
    if (value >= 75) return 'bg-red-400';
    if (value >= 50) return 'bg-red-200';
    return 'bg-red-500';
  };

  // ✅ Highest stat logic added here
  const stats = displayedPokemon?.stats || {};
  const maxStatValue = Math.max(
    ...(Object.values(stats) as number[])
  );
  const maxStatKeys = Object.entries(stats)
    .filter(([, value]) => value === maxStatValue)
    .map(([key]) => key);

  return (
    <Modal
      open={isDisplayCardOpen}
      onClose={handleClose}
      disableScrollLock
    >
      <div className="relative w-[360px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gradient-to-b from-gray-600 to-slate-400">
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          className="absolute bottom-2 right-2 text-white hover:text-black"
        >
          <CloseIcon />
        </IconButton>

        {/* Name + Favorite */}
        <div className="text-xl font-bold mb-3 text-black text-center flex justify-center items-center gap-2">
          {displayedPokemon?.name}
          <IconButton
            onClick={toggleFavorite}
            className="p-0 hover:scale-110 transition-transform duration-200"
          >
            {isFavorite ? (
              <StarIcon className="text-yellow-500" />
            ) : (
              <StarBorderIcon className="text-yellow-500" />
            )}
          </IconButton>
        </div>

        {/* Image */}
        {displayedPokemon?.img && (
          <div className="flex justify-center mb-4">
            <img
              src={displayedPokemon.img}
              alt={displayedPokemon.name}
              className="w-20 h-20"
            />
          </div>
        )}

        {/* Stat Bars */}
        {Object.entries(stats).map(([key, value]) => {
          const fillPercent =
            typeof value === 'number' ? (value / maxStat) * 100 : 0;

          return (
            <div key={key} className="mb-3 text-black">
              <div className="flex justify-between text-m font-bold capitalize">
                <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                <span
                  className={
                    maxStatKeys.includes(key)
                      ? 'text-red-600 font-extrabold'
                      : ''
                  }
                >
                  {value}
                </span>
              </div>
              <div className="w-full bg-gray-500 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${statBarColor(value)}`}
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default DisplayCardModal;
