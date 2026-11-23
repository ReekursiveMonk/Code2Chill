import { Link } from 'react-router-dom';
import Logo from './Logo';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Join Us', path: '/join' },
  ];

  const socialLinks = [
    { icon: GithubIcon, href: 'https://github.com/CodeWithPrinceX/Code2Chill', label: 'GitHub' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    {
      icon: InstagramIcon,
      href: 'https://www.instagram.com/code2chill.osl/',
      label: 'Instagram (@code2chill.osl)',
    },
  ].filter((s) => s.href !== '#');

  return (
    <footer className="bg-bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              A university coding club for programmers, developers and AI enthusiasts.
              Build together, grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-green-primary text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-lg bg-bg-primary border border-border text-text-secondary
                             hover:text-green-primary hover:border-green-primary/30 transition-all duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4">
              Follow us on Instagram at{' '}
              <a
                href="https://www.instagram.com/code2chill.osl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-green-primary transition-colors duration-200"
              >
                @code2chill.osl
              </a>{' '}
              for updates on events, projects and community news.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            &copy; {currentYear} Code2Chill. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with <span className="text-green-primary">&#9829;</span> by the Code2Chill community
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
