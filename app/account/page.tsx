'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/graphql/fetchData';
import {
  ACCOUNT_QUERY,
  ACCOUNT_QUERY_NAME,
} from '@/graphql/queries/accountQuery';

/**
 * @description
 * The Account Page for the logged in user
 */

const Page = () => {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const accountQ = useQuery({
    queryKey: [ACCOUNT_QUERY_NAME],
    queryFn: () =>
      fetchData({
        query: ACCOUNT_QUERY,
        queryName: ACCOUNT_QUERY_NAME,
        variables: { token },
      }),
    enabled: !!token,
  });

  return (
    <div className="p-2">
      <div>
        NAME:{' '}
        {accountQ.isFetching
          ? 'Fetching...'
          : accountQ?.data?.account?.name}
      </div>
      <div>
        EMAIL:{' '}
        {accountQ.isFetching
          ? 'Fetching...'
          : accountQ?.data?.account?.email}
      </div>
    </div>
  );
};

export default Page;
