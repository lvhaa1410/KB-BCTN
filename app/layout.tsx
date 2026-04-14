import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'TC Eyes - Annual Report Analysis',
  description: 'Professional search engine and analysis tool for Annual Reports of listed companies in Vietnam.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[var(--color-background)] text-slate-200 antialiased selection:bg-blue-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
