import Link from 'next/link';

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
