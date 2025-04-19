/**
 * @description
 * Fetch utility used for all GQL queries/mutations
 */

export const fetchData = async ({
  query,
  queryName,
  variables = {},
}: {
  query: string;
  queryName: string;
  variables?: any;
}) => {
  const res = await fetch(`/api/graphql?${queryName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
};
