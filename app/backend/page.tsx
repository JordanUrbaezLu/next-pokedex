'use client';

import { fetchData } from '@/graphql/fetchData';
import { DATA_QUERY } from '@/graphql/queries/dataQuery';
import { useQuery } from '@tanstack/react-query';

/**
 * @description
 * Test Page to check health of the backend API
 */

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['graphqlData'],
    queryFn: () =>
      fetchData({ query: DATA_QUERY, queryName: 'Data' }),
  });

  if (isLoading) {
    return <div>LOADING............</div>;
  }

  return <div>{JSON.stringify(data?.data, null, 2)}</div>;
};

export default Page;
