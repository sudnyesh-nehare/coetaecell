import Link from 'next/link';
import { CTAButton, DemoNotice, ImagePanel, SectionHeading } from '@/components/ui';
import { EventCard } from '@/components/event-card';
import { GalleryGrid } from '@/components/gallery-grid';
import { assets, initiatives } from '@/content/site';
import { events } from '@/content/events';
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-top">
          <p className="eyebrow">
            <span className="status-dot" /> THE ENTREPRENEURSHIP CELL · COETA
          </p>
          <span className="hero-index">THINK BIG. START HERE.</span>
        </div>
        <div className="hero-heading">
          <h1>
            Where ideas
            <br />
            find their <span className="accent">people.</span>
          </h1>
          <span className="hero-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="hero-bottom">
          <p>
            A space to think differently. A community to build with.
            <br className="desktop-break" /> Your entrepreneurial journey starts right here.
          </p>
          <div className="hero-actions">
            <CTAButton href="/about">Explore E-Cell</CTAButton>
            <CTAButton href="/events" secondary>
              Upcoming events
            </CTAButton>
          </div>
        </div>
        <div className="hero-photo">
          <ImagePanel image={assets.hero} priority sizes="100vw" />
          <div className="photo-caption">
            <span>IT STARTS WITH A CONVERSATION.</span>
            <span>AND GOES WHERE YOU TAKE IT. ↗</span>
          </div>
          <span className="photo-credit">Illustrative photography</span>
        </div>
        <div className="hero-footnote">
          <span>CURIOUS MINDS. SHARED AMBITION.</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>
      <section className="featured-section container">
        <div className="featured-label">
          <span className="eyebrow">ON THE HORIZON</span>
          <span className="tiny-tag">DEMO EVENT</span>
        </div>
        <div className="featured-event">
          <div className="featured-date">
            <strong>14</strong>
            <span>NOVEMBER 2026</span>
          </div>
          <div>
            <p className="eyebrow">PITCH COMPETITION</p>
            <h2>
              The First Pitch<span className="accent">.</span>
            </h2>
            <p>Your idea. Your stage. Your first step.</p>
          </div>
          <CTAButton href="/events/the-first-pitch" secondary>
            Discover the event
          </CTAButton>
        </div>
      </section>
      <section className="section container about-section">
        <p className="eyebrow">01 / WHO WE ARE</p>
        <div>
          <h2>
            Not just an idea.
            <br />
            The beginning of
            <br />
            <span className="muted">something bigger.</span>
          </h2>
          <div className="about-copy">
            <p>
              We believe entrepreneurship begins with curiosity. The courage to ask “what if?” and
              the drive to find out.
            </p>
            <div>
              <p>
                E-Cell COETA is a space for students to explore, experiment, and grow together. From
                that first spark to the next bold step, there’s a place for you here.
              </p>
              <Link href="/about" className="text-link">
                Get to know us <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="initiatives-section section">
        <div className="container">
          <SectionHeading
            label="02 / FIND YOUR STARTING POINT"
            title="Many ways to make a start."
            href="/initiatives"
            linkText="Our initiatives"
          />
          <div className="initiative-grid">
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
          </div>
          <p className="small-note">
            Proposed programmes · The official calendar will be announced after approval.
          </p>
        </div>
      </section>
      <section className="section container nec-section">
        <div className="nec-art" aria-hidden="true">
          <span className="nec-art-label">FROM CAMPUS TO POSSIBILITY</span>
          <div className="nec-letters">
            N<span>↗</span>
            <br />
            EC.
          </div>
          <span className="nec-art-footer">NATIONAL ENTREPRENEURSHIP CHALLENGE</span>
        </div>
        <div className="nec-copy">
          <p className="eyebrow">03 / A BIGGER PLAYGROUND</p>
          <h2>
            Campus energy.
            <br />
            National ambition.
          </h2>
          <p>
            The National Entrepreneurship Challenge brings a bigger perspective to building an
            entrepreneurial culture. Explore our plans, activities, and the journey ahead.
          </p>
          <CTAButton href="/nec" secondary>
            Explore NEC
          </CTAButton>
          <p className="small-note">Participation details to be confirmed.</p>
        </div>
      </section>
      <section className="impact-section container">
        <div>
          <p className="eyebrow">WHAT WE’RE BUILDING TOWARDS</p>
          <h2>
            Potential.
            <br />
            Measured in action.
          </h2>
          <p className="small-note">
            Verified impact figures will be published here.
            <br />
            No achievements are claimed in this preview.
          </p>
        </div>
        <div className="impact-grid">
          {['Ideas explored', 'Students engaged', 'Experiences created'].map((label) => (
            <div className="stat-block" key={label}>
              <span>—</span>
              <h3>{label}</h3>
              <p>Our story is taking shape</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          label="04 / SHOW UP. TRY SOMETHING."
          title="Your next opportunity."
          href="/events"
          linkText="All events"
        />
        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        <DemoNotice />
      </section>
      <section className="team-section container">
        <div>
          <p className="eyebrow">05 / BUILT BY STUDENTS, FOR STUDENTS</p>
          <h2>
            Good ideas need
            <br />
            great company.
          </h2>
          <p>
            Different perspectives. A shared urge to make things happen.
            <br />
            Get to know the people behind E-Cell COETA.
          </p>
          <CTAButton href="/team" secondary>
            Meet the team
          </CTAButton>
        </div>
        <ImagePanel image={assets.workshop} />
      </section>
      <section className="section container">
        <SectionHeading
          label="06 / THE ENERGY BETWEEN THE IDEAS"
          title="More than a meeting."
          href="/gallery"
          linkText="Explore the gallery"
        />
        <GalleryGrid />
        <p className="small-note">
          A visual moodboard. Official campus photographs are coming soon.
        </p>
      </section>
      <section className="partners-section container">
        <p className="eyebrow">BETTER, TOGETHER.</p>
        <div>
          <h2>A place for future collaborators.</h2>
          <p>
            We’re making room for mentors, institutions, and organisations who share our curiosity.
          </p>
        </div>
        <Link href="/contact" className="text-link">
          Build with us <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
