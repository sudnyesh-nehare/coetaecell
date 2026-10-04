import { CTAButton } from '@/components/ui';
export default function NotFound() {
  return (
    <div className="container page-content">
      <div className="page-intro">
        <p className="eyebrow">404 / A DIFFERENT DIRECTION</p>
        <h1>
          Let’s get you
          <br />
          back to the ideas.
        </h1>
        <p>We couldn’t find that page. The next opportunity is still waiting.</p>
        <CTAButton href="/">Back to home</CTAButton>
      </div>
    </div>
  );
}
