import Link from 'next/link';

/**
 * @description
 * The NEXT POKEDEX title for the app
 */

const Title = () => {
  return (
    <div className="flex">
      <div className="title">
        <Link href="/">Next Pokédex</Link>
      </div>
    </div>
  );
};

export default Title;
