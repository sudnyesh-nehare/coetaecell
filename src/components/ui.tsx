import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { TextReveal } from './motion/primitives';
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function CTAButton({
  href,
  children,
  secondary = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`button ${secondary ? 'button-outline' : ''} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}
export function SectionHeading({
  label,
  title,
  href,
  linkText = 'Explore more',
}: {
  label: string;
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>
          <TextReveal text={title} />
        </h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {linkText}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
export function ImagePanel({
  image,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  parallax = false,
  reveal = true,
}: {
  image: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  sizes?: string;
  parallax?: boolean;
  reveal?: boolean;
}) {
  return (
    <div
      className={`image-panel ${parallax ? 'parallax-panel' : ''} ${priority ? 'image-initial' : ''} ${className}`}
      data-motion={reveal && !priority ? 'image' : undefined}
      data-parallax={parallax ? 'true' : undefined}
    >
      <div className="media-layer">
        <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} />
      </div>
    </div>
  );
}
export function DemoNotice({
  children = 'A preview of what’s possible. Event dates, programmes, and photographs are illustrative.',
}: {
  children?: ReactNode;
}) {
  return (
    <p className="demo-notice">
      <span className="status-dot" />
      {children}
    </p>
  );
}
