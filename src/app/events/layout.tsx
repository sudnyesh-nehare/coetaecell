import { RegistrationStateProvider } from '@/components/registration/registration-state';
import './events.css';
export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <RegistrationStateProvider>{children}</RegistrationStateProvider>;
}
