export const SIGNUP_MUTATION = /* GraphQL */ `
  mutation Signup(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      token
      name
      email
    }
  }
`;

export const SIGNUP_MUTATION_NAME = 'signupMutation';
