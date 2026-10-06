import Link from 'next/link';
import { site } from '@/content/site';
import { CTAButton } from './ui';
import { TextReveal } from './motion/primitives';
export function Footer() {
  return (
    <footer className="footer section-transition" data-motion="section">
      <div className="section-plane" aria-hidden="true" />
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</p>
            <h2>
              <TextReveal text={'Let’s make\nsomething happen.'} />
            </h2>
          </div>
          <CTAButton href="/contact">Get in touch</CTAButton>
        </div>
        <div className="footer-middle" data-motion="stagger">
          <Link href="/" className="footer-brand">
            E-CELL<span>COET AKOLA</span>
          </Link>
          <p>{site.institution}</p>
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
          <span>© {new Date().getFullYear()} E-CELL COET AKOLA</span>
          <span>Ideas. Initiative. Impact.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
