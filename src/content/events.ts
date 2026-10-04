import { assets } from './site';
export type EventCategory = 'Pitch competition' | 'Workshop' | 'Founder talk';
export type Event = {
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  fee: string;
  image: { src: string; alt: string };
  description: string;
  registration: 'Preview only';
};
// Demo dates, venues, fees and programmes are not confirmed institutional announcements.
export const events: Event[] = [
  {
    slug: 'the-first-pitch',
    title: 'The First Pitch',
    category: 'Pitch competition',
    date: '2026-11-14',
    day: '14',
    month: 'NOV',
    time: '10:00 AM – 4:00 PM IST',
    venue: 'COETA auditorium · proposed',
    fee: 'Free · demo',
    image: assets.pitch,
    description:
      'Big ideas start with a first pitch. Bring a problem worth solving, find your voice, and turn a spark into something real.',
    registration: 'Preview only',
  },
  {
    slug: 'zero-to-one',
    title: 'Zero to One',
    category: 'Workshop',
    date: '2026-11-21',
    day: '21',
    month: 'NOV',
    time: '11:00 AM – 2:00 PM IST',
    venue: 'Innovation lab · proposed',
    fee: 'Free · demo',
    image: assets.workshop,
    description:
      'A hands-on introduction to finding a real problem, understanding your users, and shaping your first business idea.',
    registration: 'Preview only',
  },
  {
    slug: 'beyond-the-blueprint',
    title: 'Beyond the Blueprint',
    category: 'Founder talk',
    date: '2026-12-05',
    day: '05',
    month: 'DEC',
    time: '2:00 PM – 3:30 PM IST',
    venue: 'Seminar hall · proposed',
    fee: 'Free · demo',
    image: assets.founder,
    description:
      'An honest conversation about starting out, changing direction, and the lessons that rarely make it into a pitch deck.',
    registration: 'Preview only',
  },
];
export const eventDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(`${date}T00:00:00+05:30`));
