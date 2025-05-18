/* eslint-disable  @typescript-eslint/no-explicit-any */
import { createYoga, createSchema } from 'graphql-yoga';
import { NextRequest } from 'next/server';
import { JSONResolver } from 'graphql-scalars';
import { GraphQLError } from 'graphql';

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
    friends: [Friend!]!
    pendingRequests: [Request!]!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
    signup(
      email: String!
      password: String!
      name: String!
    ): SignupResponse!
    friendRequest(targetUserId: Int!): FriendRequestResponse!
    acceptFriendRequest(
      targetUserId: Int!
    ): AcceptFriendRequestResponse!
  }

  type Friend {
    name: String!
    email: String!
    acceptedAt: String!
  }

  type Request {
    name: String!
    email: String!
    requestedAt: String!
    id: Int!
  }

  type LoginResponse {
    token: String!
    name: String!
    email: String!
  }

  type SignupResponse {
    token: String!
    name: String!
    email: String!
  }

  type FriendRequestResponse {
    message: String!
  }

  type AcceptFriendRequestResponse {
    message: String!
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

        if (res.status === 401) {
          return new GraphQLError('Invalid or expired token', {
            extensions: {
              code: 'INVALID_OR_EXPIRED_TOKEN',
              expose: true,
            },
          });
        }

        const json = await res.json();
        return json;
      } catch (err) {
        console.error('Error calling /api/account:', err);
        return null;
      }
    },

    friends: async (_: any, __: any, context: { token?: string }) => {
      const token = context.token;
      if (!token) return [];

      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/friends/list`,
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

        const friendsList = await res.json();
        return friendsList;
      } catch (err) {
        console.error('Error fetching friends:', err);
        return [];
      }
    },

    pendingRequests: async (
      _: any,
      __: any,
      context: { token?: string }
    ) => {
      const token = context.token;
      if (!token) return [];

      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/friends/pending`,
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

        const friendsList = await res.json();
        return friendsList;
      } catch (err) {
        console.error('Error fetching pending requests:', err);
        return [];
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
    signup: async (
      _: any,
      args: { email: string; password: string; name: string }
    ) => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/signup`,
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
              name: args.name,
            }),
          }
        );

        if (!res.ok) {
          const message = await res.text();
          throw new Error(message || 'Signup failed');
        }

        const data = await res.json();
        return {
          name: data.user.name,
          token: data.token,
          email: data.user.email,
        };
      } catch (err) {
        console.error('Error during signup:', err);
        throw new Error('Invalid credentials');
      }
    },
    friendRequest: async (
      _: any,
      args: { targetUserId: number },
      context: { token?: string }
    ): Promise<{ message: string }> => {
      const token = context.token;
      if (!token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED', expose: true },
        });
      }

      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/friends/request`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              NEXT_POKEDEX_CONSUMER_ID:
                process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
            },
            body: JSON.stringify({ targetUserId: args.targetUserId }),
          }
        );

        const message = await res.text();

        if (!res.ok) {
          throw new GraphQLError(message || 'Request failed', {
            extensions: { code: 'BAD_REQUEST', expose: true },
          });
        }

        return { message: message || 'Friend request sent' };
      } catch (err: any) {
        console.error('Friend request error:', err);
        throw new GraphQLError(err.message || 'Unexpected error', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', expose: true },
        });
      }
    },

    acceptFriendRequest: async (
      _: any,
      args: { targetUserId: number },
      context: { token?: string }
    ): Promise<{ message: string }> => {
      const token = context.token;
      if (!token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED', expose: true },
        });
      }

      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BACKEND_API_URL}/api/friends/accept`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              NEXT_POKEDEX_CONSUMER_ID:
                process.env.NEXT_PUBLIC_CONSUMER_ID ?? '',
            },
            body: JSON.stringify({ targetUserId: args.targetUserId }),
          }
        );

        const message = await res.text();

        if (!res.ok) {
          throw new GraphQLError(message || 'Could not accept', {
            extensions: { code: 'BAD_REQUEST', expose: true },
          });
        }

        return { message: message || 'Friend request accepted' };
      } catch (err: any) {
        console.error('Error:', err);
        throw new GraphQLError(err.message || 'Unexpected error', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', expose: true },
        });
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
