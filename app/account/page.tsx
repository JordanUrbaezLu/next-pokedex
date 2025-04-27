'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * @description
 * The Account Page for the logged-in user
 */

const Page = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading account info...</div>;
  }

  if (!user) {
    return <div>Failed to load account info.</div>;
  }

  return (
    <div className="p-2">
      <div>NAME: {user.username ?? 'N/A'}</div>
      <div>EMAIL: {user.email ?? 'N/A'}</div>
    </div>
  );
};

export default Page;
