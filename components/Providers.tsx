'use client';

import { ShinyProvider } from '@/contexts/ShinyProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

/**
 * @description
 * The set of state providers that wraps the entire project
 */

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ShinyProvider>{children}</ShinyProvider>
    </QueryClientProvider>
  );
}
