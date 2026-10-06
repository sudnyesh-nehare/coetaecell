export type EventCategory = 'Workshop / Masterclass' | 'Competition' | 'Talk / Speaker Session';
export type EventType = 'masterclass' | 'workshop' | 'competition' | 'talk';
export type Event = {
  slug: string;
  title: string;
  type: EventType;
  category: EventCategory;
  date: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  fee: string;
  image: { src: string; alt: string };
  description: string;
  registration: 'Open' | 'Closed' | 'Upcoming';
  phase: 'Upcoming' | 'Ongoing' | 'Past';
  amount: number | null;
  subtitle?: string;
  sample?: boolean;
  prerequisites?: string[];
  learningOutcomes?: string[];
  eligibility?: string;
  theme?: string;
  rules?: string[];
  rounds?: string[];
  judgingCriteria?: string[];
  criteriaIndicative?: boolean;
  submissionRequirements?: string;
  speaker?: string;
  topics?: string[];
  schedule?: string;
  faq?: [string, string][];
};
// Month precision is intentional. No exact schedule, speakers or prize claims are inferred.
export const events: Event[] = [
  {
    slug: 'idea-pitching-competition',
    title: 'Idea Pitching Competition',
    type: 'competition',
    category: 'Competition',
    sample: true,
    date: '2026-10',
    day: '',
    month: 'OCT',
    time: 'To be announced',
    venue: 'COET Akola / To be announced',
    fee: 'Fee to be announced',
    amount: null,
    subtitle: 'Turn an idea into a compelling pitch.',
    image: { src: '/images/events/idea-pitch.svg', alt: 'Abstract idea and presentation artwork' },
    description:
      'Students present an entrepreneurial or innovative idea in a structured pitch format.',
    registration: 'Upcoming',
    phase: 'Upcoming',
    theme: 'Open Innovation / Entrepreneurship',
    eligibility: 'Final eligibility details will be announced shortly.',
    judgingCriteria: [
      'Clarity of problem',
      'Originality of idea',
      'Feasibility',
      'Value proposition',
      'Quality of presentation',
    ],
    criteriaIndicative: true,
    submissionRequirements: 'Submission details will be announced shortly.',
    faq: [
      [
        'Is this a confirmed programme?',
        'This is a sample competition preview. Final event details and registration opening will be announced.',
      ],
      [
        'How will ideas be assessed?',
        'The criteria shown are indicative examples, not official judging rules.',
      ],
      [
        'What are the team size and fee?',
        'Team size and any applicable fee have not been finalized.',
      ],
    ],
  },
  {
    slug: 'cybersecurity-masterclass',
    title: 'Cybersecurity Masterclass',
    type: 'masterclass',
    category: 'Workshop / Masterclass',
    date: '2026-11',
    day: '',
    month: 'NOV',
    time: 'To be announced',
    venue: 'COET Akola / To be announced',
    fee: '₹100 per student',
    amount: 100,
    subtitle: 'Understand. Defend. Think like a security professional.',
    image: {
      src: '/images/events/cybersecurity.svg',
      alt: 'Abstract shield and connected systems — Cybersecurity Masterclass artwork',
    },
    description:
      'This masterclass introduces students to practical cybersecurity concepts, digital threats, defensive thinking and the foundations of securing modern systems.',
    registration: 'Open',
    phase: 'Upcoming',
    eligibility: 'Eligibility details will be announced shortly.',
    prerequisites: [
      'Basic familiarity with computers',
      'Interest in cybersecurity',
      'No advanced security experience required',
    ],
    learningOutcomes: [
      'Cybersecurity fundamentals',
      'Common attack surfaces',
      'Secure digital practices',
      'Introductory defensive thinking',
      'Career awareness in cybersecurity',
    ],
    faq: [
      [
        'Can I register now?',
        'Registration is open on this site for entering and reviewing participant details. Online payment integration will be enabled shortly. No registration is submitted or seat reserved yet.',
      ],
      ['Who can attend?', 'Eligibility details will be announced shortly.'],
      [
        'What is the registration fee?',
        'The fee is ₹100 per student. No payment is collected on this website yet.',
      ],
      [
        'When and where is the masterclass?',
        'November 2026 at COET Akola. The exact date, time and venue within COET Akola will be announced.',
      ],
      [
        'Will I receive a confirmation email?',
        'No confirmation email or admission ticket is issued at the review stage.',
      ],
    ],
  },
];
export const eventDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    ...(date.length > 7 ? { day: 'numeric' as const } : {}),
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(`${date.length === 7 ? `${date}-01` : date}T00:00:00+05:30`));
export const canRegister = (event: Event) =>
  event.registration === 'Open' && event.phase !== 'Past';
export const formatAmount = (amount: number | null) =>
  amount === null
    ? 'To be announced'
    : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
export type EventSection = { title: string; text?: string; items?: string[]; note?: string };
/** Only render populated sections relevant to this event type. */
export function eventSections(event: Event): EventSection[] {
  const sections: EventSection[] = [{ title: 'About', text: event.description }];
  if (event.type === 'masterclass' || event.type === 'workshop') {
    sections.push(
      { title: 'What you’ll learn', items: event.learningOutcomes },
      { title: 'Prerequisites', items: event.prerequisites },
    );
  }
  if (event.type === 'competition') {
    sections.push(
      { title: 'Theme', text: event.theme },
      { title: 'Rules', items: event.rules },
      { title: 'Rounds', items: event.rounds },
      {
        title: 'Judging criteria',
        items: event.judgingCriteria,
        note: event.criteriaIndicative
          ? 'Indicative examples only. Official judging criteria have not been announced.'
          : undefined,
      },
      { title: 'Submission', text: event.submissionRequirements },
    );
  }
  if (event.type === 'talk') sections.push({ title: 'Topics', items: event.topics });
  sections.push({
    title: event.type === 'competition' ? 'Eligibility' : 'Who can attend',
    text: event.eligibility,
  });
  if (event.type !== 'competition')
    sections.push({ title: event.type === 'talk' ? 'Speaker' : 'Instructor', text: event.speaker });
  sections.push({ title: 'Schedule', text: event.schedule });
  return sections.filter((section) => section.text?.trim() || section.items?.length);
}
