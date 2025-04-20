export const ACCOUNT_QUERY = /* GraphQL */ `
  query Account($token: String!) {
    account(token: $token) {
      name
      email
    }
  }
`;

export const ACCOUNT_QUERY_NAME = 'accountQuery';
