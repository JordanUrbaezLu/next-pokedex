'use client';

import { fetchData } from '@/graphql/fetchData';
import {
  SIGNUP_MUTATION,
  SIGNUP_MUTATION_NAME,
} from '@/graphql/mutations/signupMutation';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/contexts/AuthContext';
import { sleep } from '@/utils/sleep';

const SignupPage = () => {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [name, setName] = useState('');
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    severity: 'success' | 'error';
    message: string;
  } | null>(null);

  const [passAlertState, setPassAlertState] = useState<{
    isOpen: boolean;
    severity: 'success' | 'error';
    message: string;
  } | null>(null);

  const signupMutation = useMutation({
    mutationKey: [SIGNUP_MUTATION_NAME],
    mutationFn: (variables: {
      email: string;
      password: string;
      name: string;
    }) =>
      fetchData({
        query: SIGNUP_MUTATION,
        queryName: SIGNUP_MUTATION_NAME,
        variables,
      }),
    onSuccess: async (data) => {
      const token = data?.signup?.token;

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
          message: 'Signup Successful!',
        });

        await sleep(1750);
        router.push('/account');
      } else {
        setAlertState({
          isOpen: true,
          severity: 'error',
          message: 'Signup Failed! No token received.',
        });
      }
    },
    onError: () => {
      setAlertState({
        isOpen: true,
        severity: 'error',
        message: 'Signup Failed!',
      });
    },
  });

  const validatePassword = ({
    password,
    reEnterPassword,
  }: {
    password: string;
    reEnterPassword: string;
  }) => {
    if (password === reEnterPassword) return true;
    return false;
  };

  const disabled =
    signupMutation.isPending || signupMutation.isSuccess;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300/40 backdrop-blur-sm mt-1">
      <div className="relative bg-blue-600/40 p-8 rounded-md shadow-md w-full max-w-md h-[470px] flex flex-col justify-center space-y-6">
        <img
          src="/masterball.png"
          alt="masterball"
          className="w-10 h-10 mx-auto mb-4 borer rounded-md ml-2 mt-1"
        />
        <img
          src="/pokemongca.png"
          alt="pokemongca"
          className="w-50 h-30 mx-auto mb-1 -mt-26"
        />
        <h1 className="text-xl font-bold mb-2 ">Next Pokedex</h1>
        <h2 className="text-lg font-bold mb-4">Sign up</h2>

        {alertState?.isOpen && (
          <Alert
            severity={alertState.severity}
            style={{ backgroundColor: 'transparent' }}
          >
            {alertState.message}
          </Alert>
        )}

        {passAlertState?.isOpen && (
          <Alert
            severity={passAlertState.severity}
            style={{ backgroundColor: 'transparent' }}
          >
            {passAlertState.message}
          </Alert>
        )}

        <button
          type="button"
          className="text-sm w-fit self-end px-3 py-1 text-white rounded transition-all duration-300 ease-in-out hover:-translate-y-1 active:scale-95 mb-1 cursor-pointer"
        >
          Forgot password?
        </button>
        <input
          type="name"
          placeholder="Name"
          className="w-full mb-3 px-3 py-2 border rounded-md"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email/Username"
          className="w-full mb-3 px-3 py-2 border rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="pw"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="re-pw"
          placeholder="Re-enter Password"
          className="w-full mb-4 px-3 py-2 border rounded-md"
          onChange={(e) => setReEnterPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-800 text-white py-2 rounded shadow-md transition-all duration-300 ease-in-out hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer"
          disabled={disabled}
          data-testid="signup-button"
          onClick={() => {
            const isValid = validatePassword({
              password,
              reEnterPassword,
            });
            setPassAlertState({
              isOpen: isValid ? false : true,
              severity: 'error',
              message: "Password don't match!",
            });
            if (isValid) {
              signupMutation.mutate({ email, password, name });
            }
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
