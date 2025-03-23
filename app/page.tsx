import React from 'react';
import Pokedex from '@/components/Pokedex';

export default async function Home() {
  return (
    <div className="p-6">
      <Pokedex />
    </div>
  );
}
