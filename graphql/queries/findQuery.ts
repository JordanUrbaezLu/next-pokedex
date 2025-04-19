export const FIND_QUERY = `
  query FindPokemon(
    $question: String!,
    $pastDescriptions: [String!]!,
    $previousGuesses: [String!]!
  ) {
    findPokemon(
      question: $question,
      pastDescriptions: $pastDescriptions,
      previousGuesses: $previousGuesses
    )
  }
`;
