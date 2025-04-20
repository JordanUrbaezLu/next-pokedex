export const LOGIN_MUTATION = /* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      name
      email
    }
  }
`;

export const LOGIN_MUTATION_NAME = 'loginMutation';
