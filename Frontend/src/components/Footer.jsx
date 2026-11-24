import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { InstagramIcon } from './BrandIcons';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from './HomeSections';

/**
 * Site footer. Join Us is listed for everyone (guests and members), since
 * the navbar hides it for signed-in users. Only real links are included.
 */
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Join Us', path: '/join' },
];

const REPO_URL = 'https://github.com/CodeWithPrinceX/Code2Chill';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-ink mt-auto">
      <div className="wrap pt-14 sm:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-text-secondary leading-relaxed">
              A university coding club for programmers, developers and AI enthusiasts.{' '}
              <em className="font-display text-lg text-text-primary">Build together, grow together.</em>
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow mb-4">Explore</h2>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block py-1.5 font-display text-xl tracking-[-0.02em] text-text-primary transition-colors hover:text-accent-ink"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow */}
          <div className="md:col-span-4">
            <h2 className="eyebrow mb-4">Follow</h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 py-1.5 font-display text-2xl tracking-[-0.02em] text-text-primary transition-colors hover:text-accent-ink"
            >
              <InstagramIcon size={20} />
              {INSTAGRAM_HANDLE}
              <span className="sr-only">on Instagram (opens in a new tab)</span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-xs">
              Updates on events, projects and community news.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 sm:mt-20 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-text-muted">&copy; {currentYear} Code2Chill. All rights reserved.</p>
          <p className="text-xs text-text-muted">
            <span className="text-accent" aria-hidden="true">
              ●
            </span>{' '}
            Built by the Code2Chill community ·{' '}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="link-quiet">
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
