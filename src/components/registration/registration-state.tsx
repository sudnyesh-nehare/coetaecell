'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { emptyParticipant, type Participant } from '@/lib/registration/participant';
export type RegistrationStep = 'details' | 'review';
export type RegistrationState = {
  step: RegistrationStep;
  participant: Participant;
};
const initial: RegistrationState = { step: 'details', participant: emptyParticipant };
const Context = createContext<{
  drafts: Record<string, RegistrationState>;
  update: (slug: string, state: RegistrationState) => void;
} | null>(null);
/** Lives across /events navigation. Refresh clears it; no personal information is persisted. */
export function RegistrationStateProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<Record<string, RegistrationState>>({});
  return (
    <Context.Provider
      value={{
        drafts,
        update: (slug, state) => setDrafts((current) => ({ ...current, [slug]: state })),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useRegistrationState(slug: string) {
  const context = useContext(Context);
  if (!context) throw new Error('RegistrationStateProvider is required.');
  return [
    context.drafts[slug] ?? initial,
    (state: RegistrationState) => context.update(slug, state),
  ] as const;
}
