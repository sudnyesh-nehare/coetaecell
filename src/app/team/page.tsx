import type { Metadata } from 'next';
import { PeopleShowcase } from '@/components/people-showcase';
export const metadata: Metadata = { title: 'Team' };
export default function TeamPage() {
  return (
    <>
      <div className="container team-intro">
        <h1>Our team.</h1>
      </div>
      <PeopleShowcase full />
    </>
  );
}
