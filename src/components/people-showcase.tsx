import Image from 'next/image';
import { getTeamMembers, type TeamMember, type TeamLevel } from '@/content/team';
import { TextReveal, StaggerReveal } from './motion/primitives';
import { CTAButton } from './ui';
function Profile({ person }: { person: TeamMember }) {
  const faculty = person.level === 'faculty';
  const featured = faculty || person.level === 'leadership';
  return (
    <article
      className={`person-profile person-${person.level} ${faculty ? 'faculty-profile' : ''}`}
      data-member={person.id}
      data-level={person.level}
      data-temporary={person.temporary}
    >
      <div className="person-portrait" data-motion={faculty ? 'faculty' : undefined}>
        {person.image ? (
          <Image
            src={person.image.src}
            alt={person.image.alt}
            fill
            sizes={
              featured
                ? '(max-width: 767px) 90vw, 35vw'
                : '(max-width: 479px) 90vw, (max-width: 767px) 45vw, 22vw'
            }
          />
        ) : (
          <div
            className="person-avatar"
            role="img"
            aria-label={
              faculty ? 'Portrait not yet available' : `Temporary avatar for ${person.name}`
            }
          >
            <svg viewBox="0 0 240 300" aria-hidden="true">
              <circle cx="120" cy="100" r="42" />
              <path d="M35 280v-40a85 85 0 0 1 170 0v40z" />
            </svg>
            <span aria-hidden="true">
              {person.name
                .replace('Prof. ', '')
                .split(' ')
                .map((word) => word[0])
                .join('')}
            </span>
          </div>
        )}
      </div>
      <div className="person-copy">
        <p className="eyebrow person-group">{person.group}</p>
        <h3>{featured ? <TextReveal text={person.name} /> : person.name}</h3>
        <p className="person-role faculty-role">{person.role}</p>
        {person.department && <p>{person.department}</p>}
        {person.linkedin && (
          <a className="text-link" href={person.linkedin}>
            LinkedIn ↗
          </a>
        )}
      </div>
    </article>
  );
}
const sections: { level: TeamLevel; heading: string }[] = [
  { level: 'faculty', heading: 'Faculty Coordinator' },
  { level: 'leadership', heading: 'Leadership' },
  { level: 'head', heading: 'Team Heads' },
  { level: 'member', heading: 'Our Team' },
];
export function PeopleShowcase({ full = false }: { full?: boolean }) {
  const members = getTeamMembers(!full);
  return (
    <section className="people-section faculty-section section" aria-labelledby="people-heading">
      <div className="container">
        <p className="eyebrow">E-CELL COET AKOLA / {full ? 'OUR TEAM' : 'LEADERSHIP'}</p>
        <h2 id="people-heading" className="people-heading">
          <TextReveal text={'THE PEOPLE\nBEHIND E-CELL'} />
        </h2>
        {full && (
          <p className="team-count">
            1 Faculty Coordinator + {members.filter((person) => person.level !== 'faculty').length}{' '}
            Student Members
          </p>
        )}
        <p className="sample-roster-note">
          Student names and avatars are samples for this preview.
        </p>
        <div className="people-groups">
          {sections
            .filter(({ level }) => full || ['faculty', 'leadership'].includes(level))
            .map(({ level, heading }) => (
              <section
                className="people-group"
                data-team-group={heading}
                key={level}
                aria-label={heading}
              >
                <h2 className="eyebrow people-group-heading">{heading}</h2>
                <StaggerReveal className={`people-grid people-grid-${level}`}>
                  {members
                    .filter((person) => person.level === level)
                    .map((person) => (
                      <Profile person={person} key={person.id} />
                    ))}
                </StaggerReveal>
              </section>
            ))}
        </div>
        {!full && (
          <div className="team-cta">
            <CTAButton href="/team">View Full Team</CTAButton>
          </div>
        )}
      </div>
    </section>
  );
}
