import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        precedence="default"
        rel="stylesheet"
        type="text/css"
        href="https://fonts.googleapis.com/css?family=Poppins"
      />
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </>
  );
}
