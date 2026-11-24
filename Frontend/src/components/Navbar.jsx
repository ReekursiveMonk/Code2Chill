import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { getUserInitials } from '../utils/initials';
import { subscribeScroll } from '../utils/motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Join Us', path: '/join', guestOnly: true },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();

  // Signed-in users don't see guest-only links (Join Us). While a stored
  // session is still being checked, guest-only links and the login button
  // are held back so they don't flash for someone who is signed in.
  const showGuestItems = !user && !isLoading;
  const visibleLinks = navLinks.filter((link) => !link.guestOnly || showGuestItems);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // One shared scroll listener drives both the bottom border and the reading
  // progress bar. The bar is updated directly (no React re-render per frame).
  const progressRef = useRef(null);
  useEffect(() => {
    return subscribeScroll((y) => {
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, y / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    });
  }, []);

  // Reset the progress bar when the page changes.
  useEffect(() => {
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <nav
      aria-label="Primary"
      className={`theme-dark fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled || isOpen ? 'border-border !bg-bg-secondary' : 'border-transparent'
      }`}
    >
      {/* Reading progress: a thin terracotta line along the bottom edge. */}
      <span
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 -bottom-px h-0.5 bg-accent origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
      <div className="wrap">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop navigation + account */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {visibleLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-text-primary' : 'text-text-secondary hover:text-accent-ink'
                    }`}
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-accent origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {user ? (
              <ProfileMenu user={user} onLogout={handleLogout} />
            ) : isLoading ? (
              <span className="w-[120px] h-10" aria-hidden="true" />
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  aria-current={location.pathname === '/login' ? 'page' : undefined}
                  className="tap text-sm font-medium text-text-primary link-quiet"
                >
                  Log in
                </Link>
                <Button
                  to="/signup"
                  variant="primary"
                  size="sm"
                  aria-current={location.pathname === '/signup' ? 'page' : undefined}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile: profile shortcut + menu button */}
          <div className="flex items-center gap-4 md:hidden">
            {user && (
              <Link
                to="/profile"
                aria-label="Your profile"
                className="w-11 h-11 border border-ink flex items-center justify-center text-text-primary font-mono text-xs font-medium hover:bg-ink hover:text-paper transition-colors"
              >
                {getUserInitials(user)}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="eyebrow !text-text-primary tap px-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation: large serif links separated by hairlines */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="wrap pb-6">
          <div className="rule-ink">
            {visibleLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isOpen ? undefined : -1}
                  className={`flex items-baseline justify-between py-3.5 border-b border-border display-sm ${
                    isActive ? 'text-accent-ink' : 'text-text-primary hover:text-accent-ink'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="eyebrow" aria-hidden="true">
                      Here
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Account */}
          <div className="pt-5">
            {user ? (
              <>
                <p className="text-sm font-semibold text-text-primary truncate">
                  {user.name || 'Signed in'}
                </p>
                <p className="text-xs text-text-muted truncate mb-3">{user.email}</p>
                <div className="flex gap-6">
                  <Link
                    to="/profile"
                    aria-current={location.pathname === '/profile' ? 'page' : undefined}
                    tabIndex={isOpen ? undefined : -1}
                    className="tap gap-2 text-sm font-medium text-text-primary link-quiet"
                  >
                    <User size={15} aria-hidden="true" />
                    View profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    tabIndex={isOpen ? undefined : -1}
                    className="tap gap-2 text-sm font-medium text-text-secondary link-quiet"
                  >
                    <LogOut size={15} aria-hidden="true" />
                    Log out
                  </button>
                </div>
              </>
            ) : isLoading ? null : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  to="/login"
                  variant="outline"
                  tabIndex={isOpen ? undefined : -1}
                  aria-current={isAuthPage && location.pathname === '/login' ? 'page' : undefined}
                >
                  Log in
                </Button>
                <Button to="/signup" variant="primary" tabIndex={isOpen ? undefined : -1}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
