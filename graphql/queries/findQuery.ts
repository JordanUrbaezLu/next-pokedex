export const FIND_QUERY = /* GraphQL */ `
  query FindPokemon(
    $question: String!
    $pastDescriptions: [String!]!
    $previousGuesses: [String!]!
  ) {
    findPokemon(
      question: $question
      pastDescriptions: $pastDescriptions
      previousGuesses: $previousGuesses
    )
  }
`;

export const FIND_QUERY_NAME = 'findPokemonQuery';
