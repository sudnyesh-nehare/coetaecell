'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Route-scoped GSAP ownership. Server content is visible before enhancement. */
export function MotionController() {
  const pathname = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions?.reduce) return;
        const mobile = context.conditions?.mobile;
        const duration = mobile ? 0.55 : 0.85;
        const distance = mobile ? 16 : 38;
        const root = document.querySelector('main');
        if (!root) return;
        // ScrollTrigger creates each reveal only when visible: reading and focus never
        // depend on a hidden pre-animation state. Context also owns callback tweens.
        function reveal(target: Element, play: () => void) {
          context.add('playReveal', play);
          const callback = context.playReveal;
          ScrollTrigger.create({
            trigger: target,
            start: 'top 92%',
            once: true,
            onEnter: () => callback(),
          });
        }
        document.querySelectorAll<HTMLElement>('[data-motion]').forEach((target, index) => {
          reveal(target, () => {
            const kind = target.dataset.motion;
            if (kind === 'text') {
              gsap.from(target.querySelectorAll('.word-reveal'), {
                yPercent: 108,
                duration,
                stagger: 0.035,
                ease: 'power3.out',
                clearProps: 'transform',
              });
            } else if (kind === 'image' || kind === 'mask' || kind === 'faculty') {
              gsap.fromTo(
                target,
                {
                  clipPath:
                    kind === 'faculty'
                      ? 'inset(0 0 100% 0)'
                      : index % 2
                        ? 'inset(0 100% 0 0)'
                        : 'inset(0 0 0 100%)',
                },
                {
                  clipPath: 'inset(0 0% 0 0%)',
                  duration: kind === 'faculty' ? duration + 0.25 : duration,
                  ease: 'power3.out',
                  clearProps: 'clipPath',
                },
              );
            } else if (kind === 'section') {
              const plane = target.querySelector('.section-plane');
              if (plane)
                gsap.from(plane, {
                  scaleX: 0.92,
                  duration: 1.1,
                  ease: 'power3.out',
                  clearProps: 'transform',
                });
            } else {
              gsap.from(kind === 'stagger' ? target.children : target, {
                y: distance,
                opacity: 0,
                duration,
                stagger: target.classList.contains('people-grid-member')
                  ? { each: 0.025, amount: 0.3 }
                  : 0.09,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              });
            }
          });
        });
        document
          .querySelectorAll('.about-copy, .nec-copy, .featured-event, .partners-section')
          .forEach((target) => {
            reveal(target, () =>
              gsap.from(target.children, {
                y: distance,
                duration,
                stagger: 0.1,
                ease: 'power3.out',
                clearProps: 'transform',
              }),
            );
          });
        document.querySelectorAll('.event-card').forEach((card, index) => {
          reveal(card, () => {
            const timeline = gsap.timeline({
              defaults: { duration, ease: 'power3.out' },
              delay: (index % 3) * 0.08,
            });
            timeline
              .from(card.querySelector('.event-image-link'), {
                clipPath: 'inset(0 0 100% 0)',
                clearProps: 'clipPath',
              })
              .from(
                card.querySelector('h3'),
                {
                  y: 18,
                  clearProps: 'transform',
                },
                0.12,
              )
              .from(
                card.querySelectorAll('.event-card-meta, .event-venue'),
                {
                  opacity: 0,
                  y: 8,
                  stagger: 0.05,
                  clearProps: 'transform,opacity',
                },
                0.25,
              );
            // Registration links stay outside the entrance timeline.
          });
        });
        document.querySelectorAll('[data-parallax] .media-layer').forEach((layer) => {
          gsap.fromTo(
            layer,
            { y: mobile ? -4 : -24 },
            {
              y: mobile ? 4 : 24,
              ease: 'none',
              scrollTrigger: {
                trigger: layer.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          );
        });
        const hero = document.querySelector<HTMLElement>('.hero');
        let stopPointer = () => {};
        if (hero) {
          const opening = document.querySelector<HTMLElement>('.opening-scene');
          const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
          let intro = false;
          try {
            intro = !sessionStorage.getItem('coeta-opening-seen');
            sessionStorage.setItem('coeta-opening-seen', 'true');
          } catch {
            intro = true;
          }
          const revealAt = opening && intro ? 1.25 : 0;
          if (opening && intro) {
            gsap.set(opening, { visibility: 'visible' });
            timeline
              .fromTo(
                '.opening-drop',
                { y: -innerHeight * 0.65, scaleX: 0.7, scaleY: 0.7 },
                { y: 0, scaleX: 0.8, scaleY: 1.5, duration: 0.65, ease: 'power2.in' },
                0,
              )
              .to('.opening-drop', { scaleX: 1.5, scaleY: 0.35, duration: 0.08 }, 0.65)
              .to('.opening-drop', { scale: 0, duration: 0.1 }, 0.73)
              .fromTo(
                '.opening-ripple',
                { scale: 0.3, opacity: 1 },
                { scale: 7, opacity: 0, duration: 0.65 },
                0.65,
              )
              .to(
                '.opening-aperture',
                {
                  attr: { r: Math.hypot(innerWidth, innerHeight) },
                  duration: 0.85,
                  ease: 'power2.inOut',
                },
                0.8,
              )
              .set(opening, { visibility: 'hidden' }, 1.65);
            const skip = () => timeline.progress(1);
            window.addEventListener('pointerdown', skip, { once: true, passive: true });
            window.addEventListener('keydown', skip, { once: true });
            window.addEventListener('wheel', skip, { once: true, passive: true });
            window.addEventListener('touchstart', skip, { once: true, passive: true });
            context.add(() => () => {
              window.removeEventListener('pointerdown', skip);
              window.removeEventListener('keydown', skip);
              window.removeEventListener('wheel', skip);
              window.removeEventListener('touchstart', skip);
            });
          }
          timeline.from(
            hero.querySelector('.hero-core > .eyebrow'),
            { y: 12, opacity: 0, duration: 0.45, clearProps: 'transform,opacity' },
            revealAt,
          );
          hero.querySelectorAll('.text-reveal-line').forEach((line, index) => {
            timeline.from(
              line.querySelectorAll('.word-reveal'),
              { yPercent: 108, duration: mobile ? 0.5 : 0.65, clearProps: 'transform' },
              revealAt + 0.12 + index * 0.1,
            );
          });
          timeline.from(
            hero.querySelectorAll('.hero-actions .button'),
            { y: 16, duration: 0.5, stagger: 0.08, clearProps: 'transform' },
            revealAt + 0.4,
          );
          timeline.from(
            document.querySelectorAll(
              '.header-home .wordmark, .header-home .desktop-nav a, .header-home .header-contact, .header-home .menu-trigger',
            ),
            { y: -12, opacity: 0, duration: 0.4, stagger: 0.02, clearProps: 'transform,opacity' },
            revealAt + 0.55,
          );
          const shapes = gsap.utils
            .toArray<HTMLElement>('.hero-motif', hero)
            .filter((shape) => getComputedStyle(shape).display !== 'none');
          const drift = gsap.timeline({ paused: true });
          shapes.forEach((shape, index) => {
            drift.to(
              shape,
              {
                y: (mobile ? 7 : 19) * (index % 2 ? -1 : 1),
                duration: 3.8 + index * 0.7,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              },
              0,
            );
          });
          drift.to(
            hero.querySelector('.scroll-arrow'),
            { y: 5, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' },
            0,
          );
          // Decorative loops stop outside the hero or while the tab is hidden.
          let paused = false;
          const toggle = hero.querySelector<HTMLButtonElement>('.hero-motion-toggle');
          const trigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => drift.paused(paused || !self.isActive || document.hidden),
          });
          const visibility = () => drift.paused(paused || !trigger.isActive || document.hidden);
          const toggleMotion = () => {
            paused = !paused;
            if (toggle) {
              toggle.setAttribute('aria-pressed', String(paused));
              toggle.setAttribute('aria-label', paused ? 'Play hero motion' : 'Pause hero motion');
            }
            visibility();
          };
          if (toggle) {
            toggle.hidden = false;
            toggle.addEventListener('click', toggleMotion);
          }
          visibility();
          document.addEventListener('visibilitychange', visibility);
          if (!mobile && matchMedia('(pointer: fine)').matches) {
            const art = hero.querySelector('.hero-art');
            const x = gsap.quickTo(art, 'x', { duration: 1, ease: 'power3.out' });
            const y = gsap.quickTo(art, 'y', { duration: 1, ease: 'power3.out' });
            const move = (event: PointerEvent) => {
              x((event.clientX / innerWidth - 0.5) * 12);
              y((event.clientY / innerHeight - 0.5) * 8);
            };
            const leave = () => {
              x(0);
              y(0);
            };
            hero.addEventListener('pointermove', move, { passive: true });
            hero.addEventListener('pointerleave', leave);
            stopPointer = () => {
              hero.removeEventListener('pointermove', move);
              hero.removeEventListener('pointerleave', leave);
            };
          }
          context.add(() => () => {
            document.removeEventListener('visibilitychange', visibility);
            if (toggle) {
              toggle.removeEventListener('click', toggleMotion);
              toggle.hidden = true;
              toggle.setAttribute('aria-label', 'Pause hero motion');
              toggle.setAttribute('aria-pressed', 'false');
            }
          });
        }
        let disposed = false;
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        return () => {
          disposed = true;
          stopPointer();
        };
      },
    );
    return () => media.revert();
  }, [pathname]);
  return null;
}
