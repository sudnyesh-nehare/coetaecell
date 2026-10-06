/** Milliseconds / pixels. CSS reads matching custom properties via MotionStyles. */
export const motion = {
  reveal: 900,
  image: 1100,
  menu: 460,
  person: 720,
  stagger: 65,
  distance: 54,
  parallax: 42,
  mobileParallax: 8,
  mobileScale: 0.72,
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  threshold: 0.08,
} as const;
export const statements = {
  ribbon: 'IDEAS NEED ACTION',
  wall: ['FROM IDEAS TO IMPACT', 'BUILD · INNOVATE · CREATE'],
};
