import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/content/site';
import './globals.css';
const urbanist = localFont({
  src: [
    { path: '../../public/fonts/urbanist-400.woff2', weight: '400' },
    { path: '../../public/fonts/urbanist-500.woff2', weight: '500' },
    { path: '../../public/fonts/urbanist-600.woff2', weight: '600' },
    { path: '../../public/fonts/urbanist-700.woff2', weight: '700' },
  ],
  variable: '--font-urbanist',
  display: 'swap',
});
export const metadata: Metadata = {
  title: {
    default: 'E-Cell COETA — Where ideas find their people.',
    template: '%s | E-Cell COETA',
  },
  description: site.description,
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
