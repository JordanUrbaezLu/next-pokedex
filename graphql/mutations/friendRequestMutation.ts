export const FRIEND_REQUEST_MUTATION = /* GraphQL */ `
  mutation FriendRequest($targetUserId: Int!) {
    friendRequest(targetUserId: $targetUserId) {
      message
    }
  }
`;

export const FRIEND_REQUEST_MUTATION_NAME = 'friendRequestMutation';
