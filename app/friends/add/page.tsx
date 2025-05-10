'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  FRIEND_REQUEST_MUTATION,
  FRIEND_REQUEST_MUTATION_NAME,
} from '@/graphql/mutations/friendRequestMutation';
import { fetchData } from '@/graphql/fetchData';

const AddFriendPage = () => {
  const [friendIdentifier, setFriendIdentifier] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const friendRequestMutation = useMutation({
    mutationKey: [FRIEND_REQUEST_MUTATION_NAME],
    mutationFn: (variables: { targetUserId: number }) =>
      fetchData({
        query: FRIEND_REQUEST_MUTATION,
        queryName: FRIEND_REQUEST_MUTATION_NAME,
        variables,
      }),
    onSuccess: (data) => {
      const message =
        data.friendRequest?.message ?? 'Unknown response';
      setMessage(message);
      setStatus('success');
      setFriendIdentifier('');
    },
    onError: (error: any) => {
      setMessage(error.message);
      setStatus('error');
    },
  });

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUserId = Number(friendIdentifier.trim());
    if (isNaN(targetUserId)) {
      setStatus('error');
      setMessage('Please enter a valid user ID (number)');
      return;
    }

    setStatus('loading');
    friendRequestMutation.mutate({ targetUserId });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Add a Friend</h1>
      <form
        onSubmit={handleAddFriend}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter user ID"
          className="border px-3 py-2 rounded"
          value={friendIdentifier}
          onChange={(e) => setFriendIdentifier(e.target.value)}
          required
        />
        <button
          data-testid="add-friend"
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Add Friend'}
        </button>
      </form>
      {status !== 'idle' && (
        <p
          className={`mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddFriendPage;
