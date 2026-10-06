'use client';
import { useState, type FormEvent } from 'react';
import {
  validateParticipant,
  years,
  type FieldErrors,
  type Participant,
} from '@/lib/registration/participant';
const fields = [
  { name: 'fullName', label: 'Full Name', autoComplete: 'name', type: 'text' },
  { name: 'email', label: 'Email', autoComplete: 'email', type: 'email' },
  { name: 'mobile', label: 'Mobile Number', autoComplete: 'tel', type: 'tel' },
  { name: 'college', label: 'College', autoComplete: 'organization', type: 'text' },
  { name: 'department', label: 'Department', autoComplete: 'off', type: 'text' },
] as const;
export function ParticipantForm({
  participant,
  onChange,
  onContinue,
}: {
  participant: Participant;
  onChange: (participant: Participant) => void;
  onContinue: () => void;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  function change(name: keyof Participant, value: string) {
    onChange({ ...participant, [name]: value });
    setErrors((current) => ({ ...current, [name]: undefined }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateParticipant(participant);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) (event.currentTarget.elements.namedItem(first) as HTMLElement)?.focus();
    else onContinue();
  }
  return (
    <form onSubmit={submit} noValidate>
      <p className="checkout-help">Fields marked * are required. No login is needed.</p>
      {Object.values(errors).some(Boolean) && (
        <p className="field-error error-summary" role="alert">
          Please check the highlighted fields before continuing.
        </p>
      )}
      <div className="participant-fields">
        {fields.map((field) => (
          <div className="form-field" key={field.name}>
            <label htmlFor={field.name}>{field.label} *</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              maxLength={120}
              value={participant[field.name]}
              onChange={(event) => change(field.name, event.target.value)}
              aria-invalid={!!errors[field.name]}
              aria-describedby={`${field.name}-error${field.name === 'mobile' ? ' mobile-help' : ''}`}
            />
            {field.name === 'mobile' && (
              <p id="mobile-help" className="field-hint">
                Indian number · 10 digits, optionally with +91
              </p>
            )}
            <p id={`${field.name}-error`} className="field-error">
              {errors[field.name]}
            </p>
          </div>
        ))}
        <div className="form-field">
          <label htmlFor="year">Year *</label>
          <select
            id="year"
            name="year"
            required
            value={participant.year}
            onChange={(event) => change('year', event.target.value)}
            aria-invalid={!!errors.year}
            aria-describedby="year-error"
          >
            <option value="">Select your year</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <p id="year-error" className="field-error">
            {errors.year}
          </p>
        </div>
      </div>
      <button className="button" type="submit">
        Review Registration <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
