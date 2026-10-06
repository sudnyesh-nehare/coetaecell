import type { CSSProperties, ReactNode } from 'react';
import { motion } from './config';

/** Render on the server: animation never determines whether content exists. */
export function MotionStyles() {
  const tokens = Object.entries(motion)
    .filter(([key]) => !['threshold', 'mobileScale'].includes(key))
    .map(
      ([key, value]) =>
        `--motion-${key}: ${typeof value === 'number' ? `${value}${['distance', 'parallax', 'mobileParallax'].includes(key) ? 'px' : 'ms'}` : value}`,
    )
    .join(';');
  return <style>{`:root{${tokens}}`}</style>;
}
export function Reveal({
  children,
  className = '',
  kind = 'rise',
}: {
  children: ReactNode;
  className?: string;
  kind?: 'rise' | 'mask' | 'section';
}) {
  return (
    <div className={className} data-motion={kind}>
      {children}
    </div>
  );
}
export function TextReveal({ text, initial = false }: { text: string; initial?: boolean }) {
  let index = 0;
  return (
    <span
      className={`text-reveal ${initial ? 'text-reveal-initial' : ''}`}
      data-motion={initial ? undefined : 'text'}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split('\n').map((line, lineIndex) => (
          <span className="text-reveal-line" key={lineIndex}>
            {line.split(' ').map((word, wordIndex) => (
              <span key={wordIndex}>
                <span className="word-mask">
                  <span
                    className="word-reveal"
                    style={{ '--word-index': index++ } as CSSProperties}
                  >
                    {word}
                  </span>
                </span>{' '}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
export function StaggerReveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-motion="stagger">
      {children}
    </div>
  );
}
