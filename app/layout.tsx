import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MAI — MitrPhol AI Center of Excellence',
  description:
    'Nine AI products across agriculture, manufacturing, and enterprise data — built by MitrPhol AI.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
