/* eslint-disable  @typescript-eslint/no-explicit-any */
import { createYoga, createSchema } from 'graphql-yoga';
import { NextRequest } from 'next/server';
import { JSONResolver } from 'graphql-scalars';

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
    account: Account
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }

  type LoginResponse {
    token: String!
    name: String!
    email: String!
  }

  type Account {
    name: String!
    email: String!
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
        const message = await res.text();
        return { message };
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

    account: async (_: any, __: any, context: { token?: string }) => {
      const token = context.token;
      if (!token) return null;

      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/account`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              NEXT_POKEDEX_CONSUMER_ID:
                process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        return json;
      } catch (err) {
        console.error('Error calling /api/account:', err);
        return null;
      }
    },
  },

  Mutation: {
    login: async (
      _: any,
      args: { email: string; password: string }
    ) => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              NEXT_POKEDEX_CONSUMER_ID:
                process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
            },
            body: JSON.stringify({
              email: args.email,
              password: args.password,
            }),
          }
        );

        if (!res.ok) {
          const message = await res.text();
          throw new Error(message || 'Login failed');
        }

        const data = await res.json();
        return data;
      } catch (err) {
        console.error('Error during login:', err);
        throw new Error('Invalid credentials');
      }
    },
  },

  JSON: JSONResolver,
};

const yoga = createYoga<{ req: NextRequest }>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }) as any,
  context: async ({ req }) => {
    const cookieToken = req.cookies.get('token')?.value;
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : undefined;
    const token = bearerToken || cookieToken;
    return { token };
  },
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
  graphiql: process.env.NODE_ENV !== 'production',
});

export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, { req: request });
}

export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, { req: request });
}
