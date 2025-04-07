import { createYoga, createSchema } from 'graphql-yoga';
import { NextRequest } from 'next/server';

const typeDefs = /* GraphQL */ `
  type Query {
    data: JSON
  }

  scalar JSON
`;

const BACKEND_API_URL = process.env.BACKEND_API_URL!; // Add ! if you're sure it exists

const helloAPI = `${BACKEND_API_URL}/api/hello`;

const resolvers = {
  Query: {
    data: async () => {
      try {
        const res = await fetch(helloAPI);
        const json = await res.json();
        return json;
      } catch (err) {
        console.error('Backend fetch error:', err);
        return null;
      }
    },
  },
};

// You can use a JSON scalar to allow arbitrary JSON objects
import { JSONResolver } from 'graphql-scalars';

const yoga = createYoga<{
  req: NextRequest;
}>({
  schema: createSchema({
    typeDefs,
    resolvers: {
      ...resolvers,
      JSON: JSONResolver,
    },
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  graphiql: process.env.NODE_ENV !== 'production',
});

export { yoga as GET, yoga as POST, yoga as OPTIONS };
