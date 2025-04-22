'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/graphql/fetchData';
import {
  RELATED_QUERY,
  RELATED_QUERY_NAME,
} from '@/graphql/queries/relatedQuery';
import {
  FIND_QUERY,
  FIND_QUERY_NAME,
} from '@/graphql/queries/findQuery';

/**
 * @description
 * The FindMyPokemon Chat Support Box
 */

export default function ChatSupportBox() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState<
    string | null
  >(null);

  const [pastDescriptions, setPastDescriptions] = useState<string[]>(
    []
  );
  const [previousGuesses, setPreviousGuesses] = useState<string[]>(
    []
  );

  const [notRelated, setNotRelated] = useState(false);

  const relatedQ = useQuery({
    queryKey: [RELATED_QUERY_NAME, submittedQuestion],
    queryFn: () =>
      fetchData({
        query: RELATED_QUERY,
        queryName: RELATED_QUERY_NAME,
        variables: { question: submittedQuestion },
      }),
    enabled: !!submittedQuestion,
  });

  const findQ = useQuery({
    queryKey: [FIND_QUERY_NAME, submittedQuestion],
    queryFn: () =>
      fetchData({
        query: FIND_QUERY,
        queryName: FIND_QUERY_NAME,
        variables: {
          question: submittedQuestion,
          pastDescriptions,
          previousGuesses,
        },
      }).then((data) => data.findPokemon),
    enabled: relatedQ.data?.isRelated === true,
  });

  const handleSubmit = () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setSubmittedQuestion(trimmed);
    setNotRelated(false);
  };

  useEffect(() => {
    if (!relatedQ.isSuccess) return;

    if (relatedQ.data?.isRelated) {
      setPastDescriptions((p) => [...p, submittedQuestion!]);
      setQuestion('');
    } else {
      setNotRelated(true);
      setSubmittedQuestion(null);
    }
  }, [relatedQ.isSuccess, relatedQ.data, submittedQuestion]);

  useEffect(() => {
    if (findQ.isSuccess && findQ.data) {
      setPreviousGuesses((p) => [...p, findQ.data]);
      setSubmittedQuestion(null);
    }
  }, [findQ.isSuccess, findQ.data]);

  return (
    <div className="w-90 m-4">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
        >
          💬 Chat Support
        </button>
      ) : (
        <div className="bg-white border shadow-lg rounded-lg p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Find My Pokémon</h2>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Chat history */}
          <div className="mb-3 max-h-40 overflow-auto">
            {pastDescriptions.map((desc, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm">
                  <strong>You:</strong> {desc}
                </p>
                {previousGuesses[i] != null && (
                  <p className="text-sm">
                    <strong>Bot:</strong> {previousGuesses[i]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <textarea
            rows={3}
            className="w-full p-2 border rounded resize-none"
            placeholder="Describe the Pokémon..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={!!submittedQuestion}
          />
          <button
            onClick={handleSubmit}
            disabled={!!submittedQuestion}
            className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Ask
          </button>

          {/* Related status or retry message */}
          {relatedQ.isFetching && (
            <p className="mt-2 text-sm">Checking relevance…</p>
          )}
          {notRelated && (
            <p className="mt-2 text-sm text-red-600">
              ❌ That doesn’t seem related to Pokémon—please try
              again.
            </p>
          )}
          {relatedQ.data != null &&
            submittedQuestion &&
            relatedQ.data.isRelated && (
              <p className="mt-2 text-sm">
                Related? <strong>✅ Yes</strong>
              </p>
            )}

          {/* Guessing */}
          {findQ.isFetching && (
            <p className="mt-2 text-sm">Guessing Pokémon…</p>
          )}
          {findQ.data && (
            <p className="mt-2 text-sm">
              I think it’s <strong>{findQ.data}</strong>.
            </p>
          )}
          {findQ.isError && (
            <p className="mt-2 text-sm text-red-600">
              Error: {findQ.error?.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
