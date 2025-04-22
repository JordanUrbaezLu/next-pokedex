'use client';

import GenerationsContainer from '@/components/GenerationsContainer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <GenerationsContainer />
      {children}
    </div>
  );
}
