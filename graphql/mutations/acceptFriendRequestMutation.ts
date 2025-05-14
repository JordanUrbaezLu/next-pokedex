export const ACCEPT_FRIEND_REQUEST_MUTATION = /* GraphQL */ `
  mutation AcceptFriendRequest($targetUserId: Int!) {
    acceptFriendRequest(targetUserId: $targetUserId) {
      message
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST_MUTATION_NAME =
  'acceptFriendRequestMutation';
