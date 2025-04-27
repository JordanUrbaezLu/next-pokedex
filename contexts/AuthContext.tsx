'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchData } from '@/graphql/fetchData';
import {
  ACCOUNT_QUERY,
  ACCOUNT_QUERY_NAME,
} from '@/graphql/queries/accountQuery';

type AuthType = 'guest' | 'user' | 'admin';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  authType: AuthType;
  user: User | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  setAuthType: (authType: AuthType) => void;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      return await fetchData({
        query: ACCOUNT_QUERY,
        queryName: ACCOUNT_QUERY_NAME,
        variables: {},
      });
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const user = data?.account
    ? {
        id: data.account.id,
        email: data.account.email,
        username: data.account.name,
      }
    : null;

  const authType: AuthType = user ? 'user' : 'guest';

  const refreshAuth = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing auth:', error);
    }
  };

  const setAuthType = (newAuthType: AuthType) => {
    queryClient.setQueryData(['account'], (old: any) => ({
      ...(old ?? {}),
      authType: newAuthType,
    }));
  };

  const setUser = (newUser: User | null) => {
    queryClient.setQueryData(['account'], (old: any) => ({
      ...(old ?? {}),
      account: newUser,
    }));
  };

  const isLoggedIn = authType !== 'guest';

  return (
    <AuthContext.Provider
      value={{
        authType,
        user,
        loading: isLoading,
        refreshAuth,
        setAuthType,
        setUser,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
