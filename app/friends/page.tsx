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
import { useQuery } from '@tanstack/react-query';

/**
 * @description
 * Friends page
 */

const Page = () => {
  const { data: friendsData, isLoading: friendsDataLoading } =
    useQuery({
      queryKey: [FRIENDS_QUERY],
      queryFn: () =>
        fetchData({
          query: FRIENDS_QUERY,
          queryName: FRIENDS_QUERY_NAME,
        }),
    });

  const { data: pendingData, isLoading: pendingDataLoading } =
    useQuery({
      queryKey: [PENDING_REQUESTS_QUERY],
      queryFn: () =>
        fetchData({
          query: PENDING_REQUESTS_QUERY,
          queryName: PENDING_REQUESTS_QUERY_NAME,
        }),
    });

  const friendsList = friendsData?.friends as any[];
  const pendingList = pendingData?.pendingRequests as any[];

  if (friendsDataLoading || pendingDataLoading) {
    return <div>LOADING............</div>;
  }

  return (
    <div className="flex flex-row justify-evenly">
      <div>
        <div className="text-xl">FRIENDS</div>
        {friendsList.map((friend, index) => {
          return (
            <div key={index}>
              <div>Name: {friend?.name}</div>
              <div>Email: {friend?.email}</div>
              <div>
                Friends Since: {convertToDate(friend?.acceptedAt)}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className="text-xl">PENDING</div>
        {pendingList.map((request, index) => {
          return (
            <div key={index}>
              <div>Name: {request?.name}</div>
              <div>Email: {request?.email}</div>
              <div>
                Sent On: {convertToDate(request?.requestedAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
