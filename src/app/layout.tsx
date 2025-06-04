<<<<<<< HEAD

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'EcoFinds',
  description: 'Second-hand selling website landing page.',
=======
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/layout/site-header';
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'LoopMart - Sustainable Second-Hand Marketplace',
  description: 'Buy and sell pre-owned goods, fostering a culture of sustainability and responsible consumption.',
>>>>>>> 23315374c4ecbe8458f38a8a8a1a48c3843132b6
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
<<<<<<< HEAD
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-belleza: 'Belleza', sans-serif;
            --font-alegreya: 'Alegreya', serif;
          }
        `}} />
      </head>
      <body className="font-body antialiased" style={{
        // @ts-ignore
        '--font-body': 'var(--font-alegreya)',
        '--font-headline': 'var(--font-belleza)',
      }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
=======
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          {/* Add a simple footer later if needed */}
        </div>
        <Toaster />
>>>>>>> 23315374c4ecbe8458f38a8a8a1a48c3843132b6
      </body>
    </html>
  );
}
