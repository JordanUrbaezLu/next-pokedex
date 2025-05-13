import Link from 'next/link';

/**
 * @description
 * The NEXT POKEDEX title for the app
 */

const Title = () => {
  return (
    <div className="flex pl-7">
      <div className="title pl-168 translate-y-3">
        <img
          src="/pokemonball.png"
          alt="pokemonball.png"
          className="w-12 h-12 mx-auto ml-14 -translate-x-30 translate-y-14"
        />
        <Link href="/">Next Pokédex</Link>
      </div>
    </div>
  );
};

export default Title;
