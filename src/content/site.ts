export const site = {
  name: 'E-CELL COET AKOLA',
  institution: 'College of Engineering and Technology, Akola',
  society: 'Shri Shivaji Education Society, Amravati’s',
  hero: {
    brand: 'E-CELL COET AKOLA',
    headline: 'where ideas\nbecome impact',
    primaryCTA: 'Explore Events',
    secondaryCTA: 'About E-Cell',
  },
  description:
    'A space for curious minds, bold ideas, and the next generation of entrepreneurs at the College of Engineering and Technology, Akola.',
  navigation: [
    { label: 'About', href: '/about' },
    { label: 'Initiatives', href: '/initiatives' },
    { label: 'Events', href: '/events' },
    { label: 'NEC', href: '/nec' },
    { label: 'Team', href: '/team' },
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
    alt: 'A microphone facing an event audience — illustrative stock photography',
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
export const informationPages = {
  about: {
    eyebrow: 'ABOUT E-CELL COET AKOLA',
    title: 'Curiosity is a\ngreat beginning.',
    description:
      'E-Cell COET Akola is the entrepreneurship community of College of Engineering and Technology, Akola, working to build a stronger culture of innovation, entrepreneurship and student-led initiatives.',
    heading: 'An idea can start anywhere.',
    body: 'We focus on entrepreneurial thinking, understanding market needs and developing business ideas. Workshops, business plan competitions, interaction with entrepreneurs, mentorship and industry exposure are ways to explore that journey.',
  },
  initiatives: {
    eyebrow: 'WHAT WE DO',
    title: 'Learn. Build.\nThink ahead.',
    description: 'Explore the skills, questions and connections behind entrepreneurial thinking.',
    heading: 'Start with a real problem.',
    body: 'Understand the people affected by a problem, test your assumptions, develop an idea and learn how to communicate its value. Our focus spans startup knowledge, business planning and learning from entrepreneurs.',
  },
  nec: {
    eyebrow: 'NATIONAL ENTREPRENEURSHIP CHALLENGE',
    title: 'Our NEC\nJourney.',
    description: 'E-CELL COET AKOLA — Our participation in NEC 2024 and 2025.',
    heading: 'E-Cell, IIT Bombay',
    body: 'The National Entrepreneurship Challenge is organised by E-Cell, IIT Bombay. Our participation is an opportunity to develop entrepreneurial thinking on campus; it does not imply institutional affiliation or endorsement.',
  },
  contact: {
    eyebrow: 'CONTACT',
    title: 'Let’s start a\nconversation.',
    description:
      'Connect with E-CELL COET AKOLA about events, student participation and entrepreneurship.',
    heading: 'Find us at COET Akola.',
    body: 'College of Engineering and Technology, Akola. Babhulgaon, Akola, Maharashtra – 444104. For institutional enquiries, visit the official college website. Dedicated E-Cell contact details will be published once confirmed.',
  },
} as const;
