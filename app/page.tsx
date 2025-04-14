import React from 'react';
import Pokedex from '@/components/Pokedex';
import LoginButton from '@/components/LoginButton';
export default async function Home() {
  return (
    <div className="p-6">
      <Pokedex />
      <LoginButton />
    </div>
  );
}
