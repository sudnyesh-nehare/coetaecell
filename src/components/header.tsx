'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { site } from '@/content/site';
import { motion } from './motion/config';
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closingAnimation = useRef<Animation | null>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishClosing = () => {
      if (reduced.matches) closingAnimation.current?.finish();
    };
    reduced.addEventListener('change', finishClosing);
    return () => reduced.removeEventListener('change', finishClosing);
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      closingAnimation.current?.cancel();
      closingAnimation.current = null;
      document.body.style.overflow = '';
    };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1100px)');
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);
  function close(immediate = false) {
    const element = dialog.current;
    if (!element) return;
    const finish = () => {
      element.close();
      setOpen(false);
      trigger.current?.focus();
      closingAnimation.current = null;
    };
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      closingAnimation.current?.cancel();
      finish();
      return;
    }
    if (closingAnimation.current) return;
    const animation = element.animate(
      [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
      { duration: motion.menu, easing: motion.ease },
    );
    closingAnimation.current = animation;
    animation.finished.then(finish).catch(() => {});
  }
  function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <>
      <header className={`header ${pathname === '/' ? 'header-home' : ''}`}>
        <Link href="/" className="wordmark" aria-label="E-CELL COET AKOLA home">
          <span>
            E-CELL<span className="wordmark-sub">COET AKOLA</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-contact">
          Let’s connect <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <span /> <span />
        </button>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
        onKeyDown={keepFocusInMenu}
        aria-label="Main navigation"
      >
        <div className="mobile-menu-top">
          <span className="eyebrow">E-CELL COET AKOLA</span>
          <button onClick={() => close()} aria-label="Close navigation">
            ✕
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            { label: 'Home', href: '/' },
            ...site.navigation,
            { label: 'Contact', href: '/contact' },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => close(true)}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <small>0{i + 1}</small>
              {item.label.replace(' ↗', '')}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p className="mobile-menu-note">A space for ideas. A community for you.</p>
      </dialog>
    </>
  );
}
