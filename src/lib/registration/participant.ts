export type Participant = {
  fullName: string;
  email: string;
  mobile: string;
  college: string;
  department: string;
  year: string;
  teamName: string;
  teamMembers: string;
};
export const emptyParticipant: Participant = {
  fullName: '',
  email: '',
  mobile: '',
  college: '',
  department: '',
  year: '',
  teamName: '',
  teamMembers: '',
};
export const years = [
  'First year',
  'Second year',
  'Third year',
  'Final year',
  'Postgraduate',
  'Other',
];
export type FieldErrors = Partial<Record<keyof Participant, string>>;
export function validateParticipant(participant: Participant): FieldErrors {
  const errors: FieldErrors = {};
  const required = {
    fullName: 'Full name',
    email: 'Email',
    mobile: 'Mobile number',
    college: 'College',
    department: 'Department',
    year: 'Year',
  } as const;
  for (const [key, label] of Object.entries(required)) {
    if (!participant[key as keyof Participant].trim())
      errors[key as keyof Participant] = `${label} is required.`;
  }
  if (participant.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email.trim()))
    errors.email = 'Enter a valid email address.';
  const mobile = participant.mobile.replace(/[\s()-]/g, '');
  if (mobile && !/^(?:\+91|91)?[6-9]\d{9}$/.test(mobile))
    errors.mobile = 'Enter a 10-digit Indian mobile number, optionally with +91.';
  if (participant.year && !years.includes(participant.year)) errors.year = 'Select your year.';
  if (participant.teamMembers.split('\n').filter((name) => name.trim()).length > 2)
    errors.teamMembers = 'Add up to two other team members, one name per line.';
  for (const key of Object.keys(participant) as (keyof Participant)[]) {
    if (participant[key].length > (key === 'teamMembers' ? 240 : 120))
      errors[key] = 'Please shorten this field.';
  }
  return errors;
}
