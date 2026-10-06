import Image from 'next/image';
import { necJourney, necActivities, necMilestones, necEvidence } from '@/content/nec';
import { TextReveal, StaggerReveal } from './motion/primitives';
export function NecJourney() {
  return (
    <div className="container page-content nec-journey-page">
      <section className="page-intro">
        <p className="eyebrow">NATIONAL ENTREPRENEURSHIP CHALLENGE</p>
        <h1>
          <TextReveal text={'Our NEC\nJourney.'} initial />
        </h1>
        <p>E-CELL COET AKOLA · Participation, student initiative and shared learning.</p>
      </section>
      <section className="journey-section">
        <h2>What is NEC?</h2>
        <p>
          The National Entrepreneurship Challenge is organised by E-Cell, IIT Bombay. Our
          participation is part of building an entrepreneurship culture on campus.
        </p>
        <a className="text-link nec-official" href="https://www.ecell.in/nec/">
          Official NEC <span aria-hidden="true">↗</span>
        </a>
        <p className="small-note">
          Participation does not imply institutional affiliation, sponsorship or endorsement.
        </p>
      </section>
      <section className="journey-section">
        <h2>COET Akola’s participation.</h2>
        <StaggerReveal className="journey-grid">
          {necJourney.map((item) => (
            <article key={item.year}>
              <p className="journey-year">{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </StaggerReveal>
      </section>
      <section className="journey-section">
        <h2>Activities around the journey.</h2>
        <p>
          Alongside participation, the team developed a wider programme of student entrepreneurship
          activity. These activities are not presented as official NEC tasks.
        </p>
        <StaggerReveal className="journey-grid journey-activities">
          {necActivities.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </StaggerReveal>
      </section>
      <section className="journey-section">
        <h2>Milestones beyond campus.</h2>
        <StaggerReveal className="journey-grid">
          {necMilestones.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </StaggerReveal>
      </section>
      {!!necEvidence.length && (
        <section className="journey-section">
          <h2>From the journey.</h2>
          <div className="journey-grid">
            {necEvidence.map((item) => (
              <figure key={item.src}>
                <Image src={item.src} alt={item.alt} width={720} height={480} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
