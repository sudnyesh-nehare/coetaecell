export const site = {
  name: 'E-Cell COETA',
  description:
    'A space for curious minds, bold ideas, and the next generation of entrepreneurs at COETA.',
  navigation: [
    { label: 'About', href: '/about' },
    { label: 'Initiatives', href: '/initiatives' },
    { label: 'Events', href: '/events' },
    { label: 'NEC', href: '/nec' },
    { label: 'Team', href: '/team' },
    { label: 'Gallery', href: '/gallery' },
  ],
};
// All stock imagery is illustrative, not photography of COETA or its students.
export const assets = {
  hero: {
    src: '/images/hero/community.jpg',
    alt: 'A group of young people exchanging ideas around a table — illustrative stock photography',
  },
  pitch: {
    src: '/images/events/pitch.jpg',
    alt: 'An audience gathered for a conference — illustrative stock photography',
  },
  workshop: {
    src: '/images/events/workshop.jpg',
    alt: 'A team collaborating on a project — illustrative stock photography',
  },
  founder: {
    src: '/images/events/founder.jpg',
    alt: 'A speaker presenting on stage — illustrative stock photography',
  },
  collaboration: {
    src: '/images/gallery/collaboration.jpg',
    alt: 'People in conversation at a creative gathering — illustrative stock photography',
  },
  ideas: {
    src: '/images/gallery/ideas.jpg',
    alt: 'Participants sharing ideas in a workshop — illustrative stock photography',
  },
};
export const initiatives = [
  {
    number: '01',
    title: 'Learn by doing.',
    category: 'WORKSHOPS & BOOTCAMPS',
    description:
      'From your first problem statement to your first prototype. Build skills that go beyond the classroom.',
  },
  {
    number: '02',
    title: 'Give your idea a stage.',
    category: 'PITCHES & CHALLENGES',
    description:
      'Put your thinking to the test. Share your idea, find fresh perspectives, and make it stronger.',
  },
  {
    number: '03',
    title: 'Find your people.',
    category: 'COMMUNITY & MENTORSHIP',
    description:
      'Meet fellow builders and learn from people who have taken the leap. Nobody builds alone.',
  },
];
export const placeholderPages = {
  about: {
    eyebrow: 'THE ENTREPRENEURSHIP CELL',
    title: 'Curiosity is a\ngreat beginning.',
    description:
      'E-Cell COETA is being built as a space for students to explore entrepreneurship, learn together, and turn meaningful problems into possibilities.',
    heading: 'An idea can start anywhere.',
    body: 'A conversation after class. A problem in your community. A question nobody has asked yet. Our proposed programme brings workshops, founder conversations, and collaborative challenges into campus life.',
    note: 'The official mission, institutional details, and faculty coordinator information will be added after approval.',
  },
  initiatives: {
    eyebrow: 'LEARN. BUILD. REPEAT.',
    title: 'A little curiosity.\nA lot of possibility.',
    description:
      'Explore the proposed programmes designed to take you from “what if” to “let’s try”.',
    heading: 'Built around participation.',
    body: 'Hands-on workshops, pitch challenges, and mentorship sessions create different entry points into entrepreneurship. You do not need a startup idea to get started.',
    note: 'Programme names and the annual calendar are draft content awaiting approval.',
  },
  nec: {
    eyebrow: 'NATIONAL ENTREPRENEURSHIP CHALLENGE',
    title: 'Think campus.\nBuild beyond it.',
    description:
      'A dedicated home for COETA’s proposed National Entrepreneurship Challenge activities, learning, and participation updates.',
    heading: 'Progress, shared openly.',
    body: 'This space will bring together the team’s activities, campus initiatives, and reflections when participation details are confirmed.',
    note: 'Participation, rankings, awards, and affiliations are not yet verified. No official achievement is claimed.',
  },
  team: {
    eyebrow: 'THE PEOPLE BEHIND THE IDEAS',
    title: 'Different minds.\nShared ambition.',
    description:
      'Meet the people who will bring the E-Cell community to life — across programmes, design, outreach, and technology.',
    heading: 'A team page, with real people.',
    body: 'The approved student roster, faculty advisors, photographs, and role descriptions will be published here with consent.',
    note: 'Team profiles are pending. Stock portraits are intentionally not presented as real members.',
  },
  gallery: {
    eyebrow: 'LIFE AT E-CELL',
    title: 'Small moments.\nBig energy.',
    description:
      'A place for the conversations, experiments, and shared experiences that make a community.',
    heading: 'The beginnings of a visual archive.',
    body: 'Official event albums will be added with dates, captions, and permissions. For now, this moodboard shows the intended photographic direction.',
    note: 'Every photograph shown is illustrative stock photography, not a record of COETA events.',
  },
  contact: {
    eyebrow: 'LET’S START A CONVERSATION',
    title: 'Have an idea?\nThere’s room for it.',
    description:
      'Interested in joining, mentoring, or helping shape an event? This will be your starting point for connecting with E-Cell COETA.',
    heading: 'Good things start with hello.',
    body: 'Student enquiries, speaker invitations, and collaboration requests will be routed to the appropriate team once official contact details are confirmed.',
    note: 'Official email, campus address, social links, and office hours are pending verification. Online enquiries are not available in this preview.',
  },
} as const;
