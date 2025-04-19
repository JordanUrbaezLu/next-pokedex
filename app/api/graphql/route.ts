/* eslint-disable  @typescript-eslint/no-explicit-any */
import { createYoga, createSchema } from 'graphql-yoga';
import { NextRequest } from 'next/server';

/**
 * @description
 * The defined GraphQL layer for the app
 */

const typeDefs = /* GraphQL */ `
  type Query {
    data: JSON
    isRelated(question: String!): Boolean
    findPokemon(
      question: String!
      pastDescriptions: [String!]!
      previousGuesses: [String!]!
    ): String
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
    isRelated: async (_: any, args: { question: string }) => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/pokemon/related`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              NEXT_POKEDEX_CONSUMER_ID:
                process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
            },
            body: JSON.stringify({ question: args.question }),
          }
        );

        const data = await res.json();
        return data.related === true;
      } catch (err) {
        console.error('Error calling /api/pokemon/related:', err);
        return false;
      }
    },
    findPokemon: async (
      _: any,
      args: {
        question: string;
        pastDescriptions: string[];
        previousGuesses: string[];
      }
    ) => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/pokemon/find`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              NEXT_POKEDEX_CONSUMER_ID:
                process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
            },
            body: JSON.stringify({
              question: args.question,
              pastDescriptions: args.pastDescriptions,
              previousGuesses: args.previousGuesses,
            }),
          }
        );
        const { answer } = await res.json();
        return answer;
      } catch (err) {
        console.error('Error calling /api/pokemon/find:', err);
        return '';
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
