export const PENDING_REQUESTS_QUERY = /* GraphQL */ `
  query PendingRequests {
    pendingRequests {
      id
      name
      email
      requestedAt
    }
  }
`;

export const PENDING_REQUESTS_QUERY_NAME = 'pendingRequestsQuery';
