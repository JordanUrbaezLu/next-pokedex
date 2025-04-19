/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
        id: '#' + myPoke?.id?.toString().padStart(4, '0'),
        name:
          myPoke?.name.charAt(0).toUpperCase() +
          myPoke?.name.slice(1),
        img: myPoke?.sprites?.other?.home?.front_default,
        shinyImg: myPoke?.sprites?.other?.home?.front_shiny,
        type1: myPoke.types.at(0)?.type.name,
        type2: myPoke.types.at(1)?.type.name,
      };
    })
  );
  return newList;
}
