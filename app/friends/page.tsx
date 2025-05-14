'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import { fetchData } from '@/graphql/fetchData';
import {
  FRIENDS_QUERY,
  FRIENDS_QUERY_NAME,
} from '@/graphql/queries/friendsQuery';
import {
  PENDING_REQUESTS_QUERY,
  PENDING_REQUESTS_QUERY_NAME,
} from '@/graphql/queries/pendingRequestsQuery';
import convertToDate from '@/utils/convertToDate';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Divider } from '@mui/material';
import Button from '@/components/Button';
import {
  ACCEPT_FRIEND_REQUEST_MUTATION,
  ACCEPT_FRIEND_REQUEST_MUTATION_NAME,
} from '@/graphql/mutations/acceptFriendRequestMutation';

const FriendsPage = () => {
  const {
    data: friendsData,
    isLoading: friendsDataLoading,
    refetch: friendsRefetch,
  } = useQuery({
    queryKey: [FRIENDS_QUERY],
    queryFn: () =>
      fetchData({
        query: FRIENDS_QUERY,
        queryName: FRIENDS_QUERY_NAME,
      }),
  });

  const {
    data: pendingData,
    isLoading: pendingDataLoading,
    refetch: pendingRefetch,
  } = useQuery({
    queryKey: [PENDING_REQUESTS_QUERY],
    queryFn: () =>
      fetchData({
        query: PENDING_REQUESTS_QUERY,
        queryName: PENDING_REQUESTS_QUERY_NAME,
      }),
  });

  const acceptFriendRequestMutation = useMutation({
    mutationKey: [ACCEPT_FRIEND_REQUEST_MUTATION_NAME],
    mutationFn: (variables: { targetUserId: number }) =>
      fetchData({
        query: ACCEPT_FRIEND_REQUEST_MUTATION,
        queryName: ACCEPT_FRIEND_REQUEST_MUTATION_NAME,
        variables,
      }),
    onSuccess: () => {
      pendingRefetch();
      friendsRefetch();
    },
  });

  const friendsList = friendsData?.friends as any[];
  const pendingList = pendingData?.pendingRequests as any[];

  if (friendsDataLoading || pendingDataLoading) {
    return <div>LOADING............</div>;
  }

  return (
    <div className="flex flex-col items-center pt-6 gap-8">
      <div className="flex flex-row justify-evenly gap-10">
        {/* Friends Section */}
        <div className="max-w-[320px]">
          <div className="text-2xl font-semibold mb-4 text-center">
            Friends
          </div>
          <div className="flex flex-col gap-4">
            {friendsList.map((friend, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl shadow hover:shadow-md transition"
              >
                <div className="font-medium text-lg">
                  {friend?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {friend?.email}
                </div>
                <div className="text-sm mt-1">
                  Friends Since:{' '}
                  <span className="font-medium">
                    {convertToDate(friend?.acceptedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="max-w-[320px]">
          <div className="text-2xl font-semibold mb-4 text-center">
            Pending Requests
          </div>
          <div className="flex flex-col gap-4">
            {pendingList.map((request, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl shadow hover:shadow-md transition"
              >
                <div className="font-medium text-lg">
                  {request?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {request?.email}
                </div>
                <div className="text-sm mt-1">
                  Sent On:{' '}
                  <span className="font-medium">
                    {convertToDate(request?.requestedAt)}
                  </span>
                </div>
                <Button
                  name="Accept Request"
                  onClick={() =>
                    acceptFriendRequestMutation.mutate({
                      targetUserId: request.id,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button href="/friends/add" name="Add Friend" />
    </div>
  );
};

export default FriendsPage;
