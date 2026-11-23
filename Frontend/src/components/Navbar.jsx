import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../context/AuthContext';
import { getUserInitials } from '../utils/initials';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Join Us', path: '/join' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3">
      {/* Floating glass bar. Only colours transition; the blur stays static. */}
      <div
        className={`max-w-6xl mx-auto rounded-2xl border backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || isOpen
            ? 'bg-bg-secondary/85 border-border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_12px_32px_-12px_rgba(0,0,0,0.8)]'
            : 'bg-bg-secondary/55 border-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-5">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation + account */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3.5 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      isActive
                        ? 'text-accent font-semibold'
                        : 'font-medium text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {/* Active indicator */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {user ? (
              <ProfileMenu user={user} onLogout={handleLogout} />
            ) : (
              <Link
                to="/login"
                aria-current={isAuthPage ? 'page' : undefined}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 border-accent brutal-hover ${
                  isAuthPage
                    ? 'bg-accent text-bg-primary brutal-shadow-light'
                    : 'bg-bg-primary text-accent'
                }`}
              >
                <LogIn size={15} aria-hidden="true" />
                Log in
              </Link>
            )}
          </div>

          {/* Mobile: profile shortcut + menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <Link
                to="/profile"
                aria-label="Your profile"
                className="w-9 h-9 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-mono text-xs font-bold hover:border-accent transition-colors"
              >
                {getUserInitials(user)}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                isOpen
                  ? 'border-accent/50 text-accent bg-accent/10'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (inside the same glass bar) */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-border px-3 pt-2 pb-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isOpen ? undefined : -1}
                  className={`block px-4 py-3 rounded-lg border-l-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Account */}
            <div className="mt-2 pt-2 border-t border-border">
              {user ? (
                <>
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {user.name || 'Signed in'}
                    </p>
                    <p className="text-xs text-text-muted truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    aria-current={location.pathname === '/profile' ? 'page' : undefined}
                    tabIndex={isOpen ? undefined : -1}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-l-2 text-sm font-medium transition-colors duration-200 ${
                      location.pathname === '/profile'
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    <User size={16} aria-hidden="true" />
                    View profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    tabIndex={isOpen ? undefined : -1}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border-l-2 border-transparent text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-colors duration-200"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2 pb-1 px-1">
                  <Link
                    to="/login"
                    tabIndex={isOpen ? undefined : -1}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-accent text-sm font-semibold text-accent bg-bg-primary brutal-hover"
                  >
                    <LogIn size={16} aria-hidden="true" />
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    tabIndex={isOpen ? undefined : -1}
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-accent bg-accent text-bg-primary text-sm font-semibold brutal-hover brutal-shadow-light"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
