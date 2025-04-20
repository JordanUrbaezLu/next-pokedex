export const RELATED_QUERY = /* GraphQL */ `
  query Related($question: String!) {
    isRelated(question: $question)
  }
`;

export const RELATED_QUERY_NAME = 'relatedQuery';
