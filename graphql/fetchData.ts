export const fetchData = async ({
  query,
  queryName,
  variables = {},
  headers = {},
}: {
  query: string;
  queryName: string;
  variables?: any;
  headers?: Record<string, string>;
}) => {
  const res = await fetch(`/api/graphql?${queryName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    credentials: 'include',
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
};
