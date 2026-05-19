import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';;
import './globals.css'
import { ReduxProvider } from '../lib/ReduxProvider';


/* ================= FONT ================= */

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'চাষী ভাই',
  description: 'চাষী ভাই — কৃষকের বিশ্বস্ত সঙ্গী',
};

/* ================= LAYOUT ================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        {/* Bengali Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${outfit.className} antialiased`}
        style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
      >
        
          <Toaster position="top-right" reverseOrder={false} />
          <ReduxProvider>
          {children}
          </ReduxProvider>
      </body>
    </html>
  );
}

