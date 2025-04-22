import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Title from '@/components/Title';
import Providers from '@/components/Providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navigation from '@/components/Navigation';

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
          <Title />
          <Navigation />
          {children}
          <SpeedInsights />
          <Analytics mode="production" />
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
