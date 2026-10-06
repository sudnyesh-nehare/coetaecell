export const teamGroups = ['Faculty Coordinator', 'Leadership', 'Team Heads', 'Our Team'] as const;
export type TeamLevel = 'faculty' | 'leadership' | 'head' | 'member';
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: string;
  level: TeamLevel;
  department?: string;
  image?: { src: string; alt: string };
  linkedin?: string;
  priority: number;
  featured: boolean;
  temporary: boolean;
};
// All student identities below are SAMPLE DATA, not verified people or appointments.
// Replace names, roles, groups and optional image/LinkedIn together, then set temporary: false.
// The 25-student roster INCLUDES President and Vice President and EXCLUDES faculty.
const sampleStudents: [string, string, string, TeamLevel][] = [
  ['Aarav Sharma', 'President', 'Leadership', 'leadership'],
  ['Ananya Patil', 'Vice President', 'Leadership', 'leadership'],
  ['Ishaan Joshi', 'Events Head', 'Events', 'head'],
  ['Meera Kulkarni', 'Technology Head', 'Technology', 'head'],
  ['Rohan Deshpande', 'Design Head', 'Design', 'head'],
  ['Saanvi Kale', 'NEC Head', 'NEC', 'head'],
  ['Aditya More', 'Events Member', 'Events', 'member'],
  ['Diya Pawar', 'Events Member', 'Events', 'member'],
  ['Kabir Shah', 'Events Member', 'Events', 'member'],
  ['Avani Jadhav', 'Events Member', 'Events', 'member'],
  ['Vedant Patil', 'Events Member', 'Events', 'member'],
  ['Anika Rao', 'Technology Member', 'Technology', 'member'],
  ['Arjun Kulkarni', 'Technology Member', 'Technology', 'member'],
  ['Riya Joshi', 'Technology Member', 'Technology', 'member'],
  ['Atharva Kale', 'Technology Member', 'Technology', 'member'],
  ['Nisha More', 'Technology Member', 'Technology', 'member'],
  ['Vihaan Shah', 'Design Member', 'Design', 'member'],
  ['Ira Deshpande', 'Design Member', 'Design', 'member'],
  ['Om Pawar', 'Design Member', 'Design', 'member'],
  ['Tara Jadhav', 'Design Member', 'Design', 'member'],
  ['Yash Rao', 'Design Member', 'Design', 'member'],
  ['Siya Kulkarni', 'NEC Member', 'NEC', 'member'],
  ['Dhruv Joshi', 'NEC Member', 'NEC', 'member'],
  ['Aditi Kale', 'NEC Member', 'NEC', 'member'],
  ['Neel Patil', 'NEC Member', 'NEC', 'member'],
];
export const teamMembers: TeamMember[] = [
  {
    id: 'rutuja-deshmukh',
    name: 'Prof. Rutuja Deshmukh',
    role: 'Faculty Coordinator',
    group: 'Faculty Coordination',
    level: 'faculty',
    priority: 0,
    featured: true,
    temporary: false,
  },
  ...sampleStudents.map(([name, role, group, level], index) => ({
    id: `sample-student-${index + 1}`,
    name,
    role,
    group,
    level,
    priority: index + 1,
    featured: level === 'leadership',
    temporary: true,
  })),
];
const levels: TeamLevel[] = ['faculty', 'leadership', 'head', 'member'];
export function getTeamMembers(featuredOnly = false) {
  return teamMembers
    .filter(
      (person) => person.name.trim() && person.role.trim() && (!featuredOnly || person.featured),
    )
    .toSorted(
      (a, b) => levels.indexOf(a.level) - levels.indexOf(b.level) || a.priority - b.priority,
    );
}
