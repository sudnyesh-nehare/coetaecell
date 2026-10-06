import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/content/site';
import './globals.css';
import './motion.css';
import './public.css';
import { MotionStyles } from '@/components/motion/primitives';
import { MotionController } from '@/components/motion/motion-controller';
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
    default: 'E-CELL COET AKOLA — Where ideas become impact.',
    template: '%s | E-CELL COET AKOLA',
  },
  description: site.description,
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body id="top">
        <MotionStyles />
        <MotionController />
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
