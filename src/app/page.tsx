import Link from 'next/link';
import { CTAButton, SectionHeading } from '@/components/ui';
import { site, initiatives } from '@/content/site';
import { FeaturedEvent } from '@/components/featured-event';
import { TextReveal, StaggerReveal } from '@/components/motion/primitives';
import { Marquee } from '@/components/motion/marquee';
import { statements } from '@/components/motion/config';
import { necJourney } from '@/content/nec';
import { PeopleShowcase } from '@/components/people-showcase';
export default function Home() {
  return (
    <div className="home-page">
      <div className="opening-scene" aria-hidden="true">
        <svg className="opening-screen" width="100%" height="100%">
          <defs>
            <mask id="opening-hole">
              <rect width="100%" height="100%" fill="white" />
              <circle className="opening-aperture" cx="50%" cy="60%" r="0" fill="black" />
            </mask>
          </defs>
          <rect width="100%" height="100%" className="opening-ink" mask="url(#opening-hole)" />
        </svg>
        <span className="opening-drop" />
        <span className="opening-ripple" />
      </div>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-art" aria-hidden="true">
          <div className="hero-motif motif-e">
            <svg viewBox="0 0 200 200">
              <path d="M40 20h140v38H82v23h78v38H82v23h98v38H40z" fill="currentColor" />
            </svg>
          </div>
          <div className="hero-motif motif-orbit">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="30" />
              <circle cx="158" cy="44" r="23" fill="currentColor" />
            </svg>
          </div>
          <div className="hero-motif motif-arrow">
            <svg viewBox="0 0 200 200">
              <path
                d="M35 155 145 45M45 45h100v100"
                fill="none"
                stroke="currentColor"
                strokeWidth="32"
              />
            </svg>
          </div>
        </div>
        <button
          className="hero-motion-toggle"
          type="button"
          hidden
          aria-pressed="false"
          aria-label="Pause hero motion"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path className="motion-pause-icon" d="M7 5h3v14H7zm7 0h3v14h-3z" />
            <path className="motion-play-icon" d="m7 4 14 8-14 8z" />
          </svg>
        </button>
        <div className="hero-core">
          <p className="eyebrow hero-brand">
            E-CELL<span>COET AKOLA</span>
          </p>
          <h1 id="hero-heading">
            <TextReveal text={site.hero.headline} initial />
          </h1>
          <div className="hero-actions">
            <CTAButton href="/events">{site.hero.primaryCTA}</CTAButton>
            <CTAButton href="#about" secondary>
              {site.hero.secondaryCTA}
            </CTAButton>
          </div>
        </div>
        <a className="hero-scroll" href="#featured">
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </section>
      <FeaturedEvent />
      <section className="section container about-section" id="about">
        <p className="eyebrow">01 / WHO WE ARE</p>
        <div>
          <h2>
            <TextReveal text={'Not just an idea.\nThe beginning of\nsomething bigger.'} />
          </h2>
          <div className="about-copy">
            <p>
              Entrepreneurial thinking starts with understanding people, exploring market needs, and
              developing ideas that could make a difference.
            </p>
            <div>
              <p>
                E-Cell COET Akola is the entrepreneurship community of College of Engineering and
                Technology, Akola, working to build a stronger culture of innovation,
                entrepreneurship and student-led initiatives.
              </p>
              <Link href="/about" className="text-link">
                Get to know us <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Marquee lines={[statements.ribbon]} />
      <section className="initiatives-section section section-transition" data-motion="section">
        <div className="section-plane" aria-hidden="true" />
        <div className="container">
          <SectionHeading
            label="02 / FIND YOUR STARTING POINT"
            title="Many ways to make a start."
            href="/initiatives"
            linkText="Our initiatives"
          />
          <StaggerReveal className="initiative-grid">
            {initiatives.map((item) => (
              <Link className="initiative-card" href="/initiatives" key={item.number}>
                <div className="initiative-top">
                  <span>{item.number}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div>
                  <p className="eyebrow">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>
      <section className="section container nec-section">
        <div className="nec-art" data-motion="mask" aria-hidden="true">
          <span className="nec-art-label">FROM CAMPUS TO POSSIBILITY</span>
          <div className="nec-letters">
            NEC <span>↗</span>
          </div>
          <span className="nec-art-footer">NATIONAL ENTREPRENEURSHIP CHALLENGE</span>
        </div>
        <div className="nec-copy">
          <p className="eyebrow">NATIONAL ENTREPRENEURSHIP CHALLENGE</p>
          <h2>
            <TextReveal text="Our NEC Journey." />
          </h2>
          <div className="nec-preview-timeline">
            {necJourney.map((item) => (
              <div key={item.year}>
                <strong>{item.year}</strong>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
          <CTAButton href="/nec" secondary>
            Explore Our NEC Journey
          </CTAButton>
          <a className="text-link nec-official" href="https://www.ecell.in/nec/">
            Official NEC <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <Marquee lines={statements.wall} variant="wall" />
      <PeopleShowcase />
      <section className="section container activities-section">
        <SectionHeading
          label="ENTREPRENEURSHIP IN PRACTICE"
          title="Ask better questions. Build better ideas."
        />
        <StaggerReveal className="activity-grid">
          <div>
            <h3>Understand a need.</h3>
            <p>Explore market needs and the real problems people face.</p>
          </div>
          <div>
            <h3>Develop an idea.</h3>
            <p>Connect business thinking with experimentation and practical skills.</p>
          </div>
          <div>
            <h3>Learn together.</h3>
            <p>Seek new perspectives through workshops, conversations and mentorship.</p>
          </div>
        </StaggerReveal>
      </section>
      <section className="partners-section container" id="contact">
        <p className="eyebrow">CONTACT</p>
        <div>
          <h2>Let’s start a conversation.</h2>
          <p>Student participation, events and entrepreneurship at COET Akola.</p>
        </div>
        <Link href="/contact" className="text-link">
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
