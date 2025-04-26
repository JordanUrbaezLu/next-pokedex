/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @description
 * The fetching utility used to get the data for each individual pokemon in the pokemon list
 */

export default async function fetchPokemonDataParser(
  pokemonList: any[]
) {
  const newList = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const myPoke = await fetch(pokemon.url).then((res) =>
        res.json()
      );
      console.log(myPoke);
      return {
        id: '#' + myPoke.id.toString().padStart(4, '0'),
        name:
          myPoke.name.charAt(0).toUpperCase() + myPoke.name.slice(1),
        img: myPoke?.sprites?.other?.home?.front_default,
        shinyImg: myPoke.sprites.other.home.front_shiny,
        type1: myPoke.types?.[0]?.type?.name,
        type2: myPoke.types?.[1]?.type?.name ?? undefined,
        stats: {
          hp: myPoke.stats[0]?.base_stat,
          attack: myPoke.stats[1]?.base_stat,
          defense: myPoke.stats[2]?.base_stat,
          specialAttack: myPoke.stats[3]?.base_stat,
          specialDefense: myPoke.stats[4]?.base_stat,
          speed: myPoke.stats[5]?.base_stat,
        },
      };
    })
  );
  return newList;
}
