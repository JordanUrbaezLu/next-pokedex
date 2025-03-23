import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import GenerationsContainer from '@/components/GenerationsContainer';
import Title from '@/components/Title';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Next Pokedex',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <Title />
        <GenerationsContainer />
        {children}
      </body>
      <Analytics />
    </html>
  );
}
