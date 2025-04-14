import { createYoga, createSchema } from 'graphql-yoga';
import { NextRequest } from 'next/server';

const typeDefs = /* GraphQL */ `
  type Query {
    data: JSON
  }

  scalar JSON
`;

const NEXT_PUBLIC_BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL!;

const helloAPI = `${NEXT_PUBLIC_BACKEND_API_URL}/api/hello`;

const resolvers = {
  Query: {
    data: async () => {
      try {
        const res = await fetch(helloAPI, {
          headers: {
            NEXT_POKEDEX_CONSUMER_ID:
              process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
          },
        });
        const message = await res.text(); // parse plain text
        return { message }; // wrap in an object so it's GraphQL-valid
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
  fetchAPI: { Request, Response }, // Needed for Next.js compatibility
  graphiql: process.env.NODE_ENV !== 'production',
});

export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, { req: request });
}

export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, { req: request });
}
