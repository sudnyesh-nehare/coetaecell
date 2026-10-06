'use client';
import { useEffect, useRef, useState } from 'react';
/** CSS owns movement; the observer only pauses it when offscreen. */
export function Marquee({
  lines,
  variant = 'ribbon',
}: {
  lines: string[];
  variant?: 'ribbon' | 'wall';
}) {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={root}
      className={`statement statement-${variant}`}
      data-paused={paused}
      aria-label={lines.join('. ')}
    >
      <div className="statement-lines" aria-hidden="true">
        {lines.map((line, row) => (
          <div className="statement-window" key={line}>
            <div className={`statement-track ${row % 2 ? 'statement-reverse' : ''}`}>
              {[0, 1].map((copy) => (
                <span className="statement-copy" key={copy}>
                  {[0, 1, 2].map((index) => (
                    <span key={index}>
                      {line}
                      <span className="statement-symbol">↗</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="statement-toggle"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Play moving statement' : 'Pause moving statement'}
        aria-pressed={paused}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={paused ? 'm7 4 14 8-14 8z' : 'M7 5h3v14H7zm7 0h3v14h-3z'} />
        </svg>
      </button>
    </section>
  );
}
