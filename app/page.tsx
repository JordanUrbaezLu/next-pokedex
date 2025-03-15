//import Image from "next/image";

export default async function Home() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
  const bulbasaur = await response.json();

  console.log(bulbasaur);

  return (
    <div>
      <div>{bulbasaur.name}</div>
      <div>{bulbasaur.weight}</div>
    </div>
  );
}
