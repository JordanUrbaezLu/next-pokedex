export const fetchData = async (query: string) => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
    }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data.data;
};
