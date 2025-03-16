import React from 'react';
import Pokedex from '@/components/Pokedex';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div className="p-6">
      <Title />
      <Pokedex />
    </div>
  );
}
