'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { site } from '@/content/site';
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
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
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
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
      <header className="header">
        <Link href="/" className="wordmark" aria-label="E-Cell COETA home">
          <span className="brand-symbol" aria-hidden="true">
            e<span>↗</span>
          </span>
          <span>
            E-CELL<span className="wordmark-sub">COETA</span>
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
        onCancel={close}
        onClose={() => setOpen(false)}
        onKeyDown={keepFocusInMenu}
        aria-label="Main navigation"
      >
        <div className="mobile-menu-top">
          <span className="eyebrow">E-CELL / COETA</span>
          <button onClick={close} aria-label="Close navigation">
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
              onClick={close}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <small>0{i + 1}</small>
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p className="mobile-menu-note">A space for ideas. A community for you.</p>
      </dialog>
    </>
  );
}
