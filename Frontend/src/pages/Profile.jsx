import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Button from '../components/Button';
import ArrowLink from '../components/ArrowLink';
import { PageLoading } from '../components/DataState';
import { useAuth } from '../context/AuthContext';
import { getUserInitials } from '../utils/initials';

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function Profile() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // While a stored login is being checked, wait instead of redirecting.
  if (isLoading) {
    return <PageLoading label="Loading your profile…" />;
  }

  // Not logged in, or the session expired (AuthContext clears it on a 401).
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const memberSince = formatDate(user.createdAt);
  const firstName = user.name?.trim().split(/\s+/)[0];

  // Only fields the API actually returns: name, email, role, createdAt.
  const details = [
    { label: 'Full name', value: user.name, wrap: 'break-words' },
    { label: 'Email', value: user.email, wrap: 'break-all' },
    { label: 'Role', value: user.role === 'admin' ? 'Admin' : 'Member', wrap: '' },
    { label: 'Account created', value: memberSince, wrap: '' },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="wrap">
        <div className="rule-ink pt-3 flex items-baseline justify-between animate-enter">
          <p className="eyebrow !text-text-primary">Your profile</p>
          <p className="eyebrow">{user.role === 'admin' ? 'Admin' : 'Member'}</p>
        </div>

        {/* Name block */}
        <header className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end animate-enter enter-delay-1">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="w-24 h-24 sm:w-28 sm:h-28 bg-ink text-paper flex items-center justify-center font-display text-4xl tracking-[-0.03em]"
            >
              {getUserInitials(user)}
            </span>
          </div>
          <div className="lg:col-span-10">
            <h1 className="display-lg text-text-primary break-words">
              {user.name || 'Code2Chill member'}
            </h1>
            {firstName && (
              <p className="lede mt-4">
                Hi {firstName} — these are the details stored with your Code2Chill account.
              </p>
            )}
          </div>
        </header>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          {/* Account details */}
          <section aria-labelledby="account-heading" className="lg:col-span-7 animate-enter enter-delay-2">
            <h2 id="account-heading" className="eyebrow !text-text-primary border-t border-ink pt-3">
              Account details
            </h2>
            <dl>
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6 py-5 border-b border-border"
                >
                  <dt className="eyebrow sm:pt-1.5">{item.label}</dt>
                  <dd className={`font-display text-xl sm:text-2xl tracking-[-0.02em] text-text-primary ${item.wrap}`}>
                    {item.value || <span className="font-sans text-base text-text-muted">Not available</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Membership + session */}
          <aside className="lg:col-span-4 lg:col-start-9 space-y-10 animate-enter enter-delay-3">
            <section aria-labelledby="membership-heading" className="bg-sage p-6 sm:p-8 text-ink">
              <h2 id="membership-heading" className="eyebrow !text-ink mb-4">
                Club membership
              </h2>
              <p className="text-sm leading-relaxed text-ink/85">
                Your account lets you log in to the website. Club membership is applied for separately through
                the Join Us form, and applications are reviewed by the club admins. Application status isn&apos;t
                shown in your account yet.
              </p>
              <div className="mt-6">
                <ArrowLink to="/join">Join Us form</ArrowLink>
              </div>
            </section>

            <section aria-labelledby="session-heading" className="border-t border-ink pt-3">
              <h2 id="session-heading" className="eyebrow !text-text-primary mb-4">
                Session
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                You stay signed in on this browser tab until you log out or close the tab. Sessions also
                expire automatically after a while; you&apos;ll be asked to log in again.
              </p>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={16} aria-hidden="true" />
                Log out
              </Button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Profile;
