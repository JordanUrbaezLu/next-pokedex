'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/graphql/fetchData';
import { RELATED_QUERY } from '@/graphql/queries/relatedQuery';

export default function ChatSupportBox() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState<
    string | null
  >(null);

  const { data, isFetching } = useQuery({
    queryKey: ['relatedCheck', submittedQuestion],
    queryFn: () =>
      fetchData({
        query: RELATED_QUERY,
        queryName: 'Related',
        variables: { question: submittedQuestion },
      }),
    enabled: !!submittedQuestion, // only run when question is submitted
  });

  const handleSubmit = () => {
    if (question.trim()) {
      setSubmittedQuestion(question);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      {open ? (
        <div className="bg-white border shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Find My Pokémon</h2>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <textarea
            className="w-full p-2 border rounded resize-none"
            rows={3}
            placeholder="Describe the Pokémon..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ask
          </button>

          {isFetching && <p className="mt-2 text-sm">Thinking...</p>}

          {data && submittedQuestion && (
            <p className="mt-2 text-sm">
              Related to Pokémon?{' '}
              <span className="font-semibold">
                {data?.isRelated ? '✅ Yes' : '❌ No'}
              </span>
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
        >
          💬 Chat Support
        </button>
      )}
    </div>
  );
}
