export const RELATED_QUERY = `
  query Related($question: String!) {
    isRelated(question: $question)
  }
`;
