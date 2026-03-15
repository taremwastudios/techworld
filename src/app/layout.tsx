import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: "TechWorld - Enterprise Technology Solutions",
  description: "TechWorld powered by Phantom Illusions Studio - Premier enterprise technology ordering platform for servers, networking, storage, and workstations.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230F172A' width='100' height='100'/><rect fill='white' x='20' y='20' width='60' height='60'/><rect fill='%232563EB' x='30' y='30' width='40' height='40'/></svg>",
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
        </Providers>
      </body>
    </html>
  );
}
