'use client';

import { fetchData } from '@/graphql/fetchData';
import {
  LOGIN_MUTATION,
  LOGIN_MUTATION_NAME,
} from '@/graphql/mutations/loginMutation';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    severity: 'success' | 'error';
    message: string;
  } | null>(null);

  const loginMutation = useMutation({
    mutationKey: [LOGIN_MUTATION_NAME],
    mutationFn: (variables: { email: string; password: string }) =>
      fetchData({
        query: LOGIN_MUTATION,
        queryName: LOGIN_MUTATION_NAME,
        variables,
      }),
    onSuccess: async (data) => {
      const token = data?.login?.token;

      if (token) {
        await fetch('/api/auth/set-cookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        await refreshAuth();
        setAlertState({
          isOpen: true,
          severity: 'success',
          message: 'Login Successful!',
        });

        setTimeout(() => router.push('/account'), 1500);
      } else {
        setAlertState({
          isOpen: true,
          severity: 'error',
          message: 'Login Failed! No token received.',
        });
      }
    },
    onError: () => {
      setAlertState({
        isOpen: true,
        severity: 'error',
        message: 'Login Failed!',
      });
    },
  });

  const disabled = loginMutation.isPending || loginMutation.isSuccess;

  return (
    <div className="min-h-screen flex items-center justify-center -mt-24 -pt-2">
      <div className="relative bg-gray-100/80 p-6 rounded-md shadow-md w-full max-w-md text-center bg-gradient-to-b from-slate-300 to-gray-900">
        <img
          src="/pokeball.png"
          alt="Pokéball"
          className="w-10 h-10 mx-auto ml-2 mt-4"
        />
        <img
          src="/pokemonlogo.png"
          alt="Pokemon Logo"
          className="w-30 h-30 mx-auto mb-4 -mt-26"
        />
        <h1 className="text-xl font-bold mb-2">Next Pokedex</h1>
        <h2 className="text-lg font-bold mb-4">Login</h2>

        {alertState?.isOpen && (
          <Alert
            severity={alertState.severity}
            style={{ backgroundColor: 'transparent' }}
          >
            {alertState.message}
          </Alert>
        )}

        <input
          type="email"
          placeholder="Email/Username"
          className="w-full mb-3 px-3 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="pw"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          data-testid="login-button"
          onClick={() => loginMutation.mutate({ email, password })}
          disabled={disabled}
          className="w-full bg-red-500 text-white py-2 rounded shadow-md transition-all duration-300 ease-in-out hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loginMutation.isSuccess
            ? 'Redirecting...'
            : loginMutation.isPending
              ? 'Logging in...'
              : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
