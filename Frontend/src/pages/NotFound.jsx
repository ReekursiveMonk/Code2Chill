import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import ArrowLink from '../components/ArrowLink';

const SUGGESTIONS = [
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
];

function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="wrap">
        <div className="rule-draw pt-3 flex items-baseline justify-between gap-4 animate-enter">
          <p className="eyebrow !text-text-primary">Error</p>
          <p className="eyebrow truncate max-w-[60%]" title={pathname}>
            {pathname}
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <p
            aria-hidden="true"
            className="mask-line lg:col-span-7 font-display text-[clamp(8rem,32vw,22rem)] leading-[0.8] tracking-[-0.06em] text-text-primary"
            style={{ '--line-delay': '120ms' }}
          >
            <span>
              4<em className="text-accent">0</em>4
            </span>
          </p>

          <div className="lg:col-span-5 lg:pb-6 animate-enter enter-delay-2">
            <h1 className="display-md text-text-primary">
              This page has <em className="text-accent">gone missing.</em>
            </h1>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-md">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <div className="mt-8">
              <Button to="/" variant="dark" className="group">
                <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Button>
            </div>
            <div className="mt-10 pt-5 border-t border-border">
              <p className="eyebrow mb-3">Or try</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {SUGGESTIONS.map((item) => (
                  <li key={item.to}>
                    <ArrowLink to={item.to}>{item.label}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
