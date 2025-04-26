'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const AuthButton = () => {
  const { authType, refreshAuth, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return null;
  }

  const isLoggedIn = authType !== 'guest';

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    await refreshAuth();
    router.push('/');
  };

  return isLoggedIn ? (
    <button
      className="p-2 m-2 rounded-md border-2 border-green-500 bg-green-200 cursor-pointer hover:bg-green-300 active:bg-green-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : (
    <button
      className="p-2 m-2 rounded-md border-2 border-green-500 bg-green-200 cursor-pointer hover:bg-green-300 active:bg-green-500 shadow-md transition-colors duration-200 ease-out hover:shadow-lg text-sm font-bold"
      onClick={() => router.push('/login')}
    >
      Login
    </button>
  );
};

export default AuthButton;
