import React from "react";
import { PokemonData } from "@/types/PokemonData";
import pokemonTypes from "../data/pokemonTypes";

const DisplayedCard = ({
  displayedPokemon,
  handleIsDisplayedCardOpen,
}: {
  displayedPokemon: PokemonData;
  handleIsDisplayedCardOpen: any;
}) => {
  const getBackgroundClass = (type1: string) => {
    switch (type1.toLowerCase()) {
      case "water":
        return "bg-gradient-to-b from-teal-300 to-teal-600";
      case "poison":
        return "bg-gradient-to-b from-purple-400 to-purple-700";
      case "normal":
        return "bg-gradient-to-b from-gray-300 to-gray-500";
      case "fire":
        return "bg-gradient-to-b from-orange-400 to-red-600";
      case "grass":
        return "bg-gradient-to-b from-green-300 to-green-600";
      default:
        return "bg-gradient-to-b from-gray-200 to-gray-400";
    }
  };

  return (
    <div className="display-card-container">
      <div
        className="overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-100"
        onClick={handleIsDisplayedCardOpen}
      ></div>
      <div
        className={`display-card relative w-[200px] h-[280px] ${getBackgroundClass(
          displayedPokemon.type1 || ""
        )} border-4 border-yellow-400 rounded-lg shadow-md p-2 z-200 overflow-hidden`}
      >

        <img src="/close.svg" className="close" alt="" />

        <div className="card-name text-center font-bold mt-16 text-gray-800 text-sm">
          {displayedPokemon.name}
        </div>

        <div className="card-image relative w-[150px] h-[150px] mx-auto mt-1 rounded-sm bg-contain bg-center bg-no-repeat z-10" style={{ backgroundImage: `url(${displayedPokemon.img || ""})` }}></div>

        <div className="flex justify-center gap-2 mt-1 z-10">
          {displayedPokemon?.type1 && (
            <img
              src={pokemonTypes[displayedPokemon.type1]}
              width={100}
              height={100}
              alt={`${displayedPokemon.type1} type image`}
              className="object-contain"
            />
          )}
          {displayedPokemon?.type2 && (
            <img
              src={pokemonTypes[displayedPokemon.type2]}
              width={100}
              height={40}
              alt={`${displayedPokemon.type2} type image`}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayedCard;