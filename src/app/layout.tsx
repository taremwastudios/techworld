import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Footer from "@/components/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: "Illusions Family - Premium Games & AI Tools",
  description: "Illusions Family - Your destination for premium games and AI tools. Download APKs, purchase games, and access your library anywhere.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
