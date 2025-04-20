'use client';

import { fetchData } from '@/graphql/fetchData';
import {
  DATA_QUERY,
  DATA_QUERY_NAME,
} from '@/graphql/queries/dataQuery';
import { useQuery } from '@tanstack/react-query';

/**
 * @description
 * Test Page to check health of the backend API
 */

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: [DATA_QUERY_NAME],
    queryFn: () =>
      fetchData({ query: DATA_QUERY, queryName: DATA_QUERY_NAME }),
  });

  if (isLoading) {
    return <div>LOADING............</div>;
  }

  return <div>{JSON.stringify(data?.data, null, 2)}</div>;
};

export default Page;
