export const FRIENDS_QUERY = /* GraphQL */ `
  query Friends {
    friends {
      name
      email
      acceptedAt
    }
  }
`;
export const FRIENDS_QUERY_NAME = 'friendsQuery';
