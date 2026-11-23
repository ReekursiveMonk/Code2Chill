import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { getUserInitials } from '../utils/initials';

/**
 * Desktop profile button and dropdown for the navbar.
 * Closes on outside click, Escape, or page change.
 */
function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls="profile-menu"
        aria-label="Open profile menu"
        className={`flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full border transition-all duration-200 ${
          open
            ? 'border-accent bg-accent/10'
            : 'border-border hover:border-accent/60 hover:bg-white/5'
        }`}
      >
        <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-mono text-xs font-bold">
          {getUserInitials(user)}
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`text-text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          id="profile-menu"
          className="absolute right-0 mt-3 w-64 rounded-xl glass-strong border border-border shadow-[4px_4px_0_0_rgba(242,169,0,0.35)] p-2 animate-fade-in"
        >
          <div className="px-3 py-2.5 mb-1 border-b border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
              Signed in
            </p>
            <p className="text-sm font-semibold text-text-primary truncate">
              {user.name || user.email}
            </p>
            {user.name && <p className="text-xs text-text-muted truncate">{user.email}</p>}
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
          >
            <User size={15} aria-hidden="true" />
            View profile
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <LogOut size={15} aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
