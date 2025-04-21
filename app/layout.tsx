import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

import GenerationsContainer from '@/components/GenerationsContainer';
import Title from '@/components/Title';
import Providers from '@/components/Providers';
import PokemonChatSupportBox from '@/components/PokemonChatSupportBox';
import LoginButton from '@/components/LoginButton';
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Next Pokedex',
};

/**
 * @description
 * The layout used for every page in the app
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <Providers>
          <LoginButton />
          <Title />
          <GenerationsContainer />
          {children}
          <PokemonChatSupportBox />
          <Analytics mode="production" />
        </Providers>
      </body>
    </html>
  );
}
