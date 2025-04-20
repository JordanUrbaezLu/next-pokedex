'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */
import { fetchData } from '@/graphql/fetchData';
import {
  LOGIN_MUTATION,
  LOGIN_MUTATION_NAME,
} from '@/graphql/mutations/loginMutation';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginMutation = useMutation({
    mutationKey: [LOGIN_MUTATION_NAME],
    mutationFn: (variables: { email: string; password: string }) =>
      fetchData({
        query: LOGIN_MUTATION,
        queryName: LOGIN_MUTATION_NAME,
        variables,
      }),
    onSuccess: (data) => {
      const token = data?.login?.token;
      if (token) {
        localStorage.setItem('token', token);
        alert(`Welcome ${data?.login?.name}!`);
      }
    },
    onError: (err: any) => {
      alert(err.message || 'Login failed');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300/40 backdrop-blur-sm mt-1">
      <form className="relative bg-blue-300/40 p-6 rounded-md shadow-md w-full max-w-md text-center">
        <img
          src="/pokeball.png"
          alt="Pokéball"
          className="w-10 h-10 mx-auto mb-4 borer rounded-md ml-2 mt-1"
        />
        <img
          src="/pokemonlogo.png"
          alt="Pokemon Logo"
          className="w-30 h-30 mx-auto mb-4 -mt-26"
        />
        <h1 className="text-xl font-bold mb-2 ">Next Pokedex</h1>
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email/Username"
          className="w-full mb-3 px-3 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => loginMutation.mutate({ email, password })}
          disabled={loginMutation.isPending}
          className="w-full bg-red-500 text-white py-2 rounded shadow-md transition-all duration-300 ease-in-out hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
