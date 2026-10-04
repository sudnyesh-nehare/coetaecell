import Link from 'next/link';
import { site } from '@/content/site';
import { CTAButton } from './ui';
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</p>
            <h2>
              Let’s make
              <br />
              something happen<span className="accent">.</span>
            </h2>
          </div>
          <CTAButton href="/contact">Get in touch</CTAButton>
        </div>
        <div className="footer-middle">
          <Link href="/" className="footer-brand">
            E-CELL<span>COETA</span>
          </Link>
          <p>
            A space for curious minds.
            <br />A community for what comes next.
          </p>
          <nav aria-label="Footer navigation">
            {site.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} E-Cell COETA</span>
          <span>Faculty review preview · All programmes are demo content</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
