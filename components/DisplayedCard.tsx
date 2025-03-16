import React from "react";
import { PokemonData } from "@/types/PokemonData";
import pokemonTypes from "../data/pokemonTypes";

const DisplayedCard = ({
  displayedPokemon,
  handleIsDisplayedCardOpen
}:{
  displayedPokemon: PokemonData;
  handleIsDisplayedCardOpen: any;
}
) => {
  return <div className="display-card-container">
    <div className="overlay"></div>
    <div className="display-card">
      <div className="text-center text-6xl" >{displayedPokemon.name}</div>
<img
        src={displayedPokemon?.img || ""}
        width={168}
        height={168}
        alt={`${name} image`}
      />
      <div>{displayedPokemon.id}</div>
      <div className="flex gap-[10px] px-[5px]">
        {displayedPokemon?.type1 && (
          <img
            src={pokemonTypes[displayedPokemon.type1]}
            width={70}
            height={70}
            alt={`${displayedPokemon.type1} type image`}
          />
        )}
        {displayedPokemon?.type2 && (
          <img
            src={pokemonTypes[displayedPokemon.type2]}
            width={70}
            height={70}
            alt={`${displayedPokemon.type2} type image`}
          />
        )}
      </div>
    </div>

    </div>
};

export default DisplayedCard;
