import React from 'react';
import Pokedex from '@/components/Pokedex';
import LoginButton from '@/components/LoginButton';

/**
 * @description
 * The Home Page that gets shown to the user
 */

export default async function Home() {
  return (
    <div className="p-6">
      <Pokedex />
      <LoginButton />
    </div>
  );
}
