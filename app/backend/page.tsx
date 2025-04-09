'use client';

import { fetchData } from '@/graphql/fetchData';
import { DATA_QUERY } from '@/graphql/queries/dataQuery';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['graphqlData'],
    queryFn: () => fetchData(DATA_QUERY),
  });

  if (isLoading) {
    return <div>LOADING............</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Page;
