import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Responsive, full-featured to-do list application',
  keywords: ['todo', 'to-do', 'todo app', 'task', 'management'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <main className="min-h-screen font-sans">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
