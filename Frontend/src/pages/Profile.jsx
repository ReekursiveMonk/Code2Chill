import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Mail, User } from 'lucide-react';
import PrototypeNotice from '../components/PrototypeNotice';
import { useAuth } from '../context/AuthContext';
import { getUserInitials } from '../utils/initials';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const details = [
    {
      icon: User,
      label: 'Name',
      value: user.name,
      empty: 'Not provided. Log in doesn’t ask for a name yet.',
      wrap: 'break-words',
    },
    { icon: Mail, label: 'Email', value: user.email, wrap: 'break-all' },
  ];

  return (
    <div className="pt-24 pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="animate-enter flex items-center gap-4 mb-5">
          <div className="w-16 h-16 shrink-0 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-mono text-xl font-bold">
            {getUserInitials(user)}
          </div>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-md border border-accent/50 text-accent text-[11px] font-mono font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 bg-accent-2" aria-hidden="true" />
              Your Profile
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary break-words">
              {user.name || 'Code2Chill Member'}
            </h1>
          </div>
        </div>

        {/* Account card */}
        <div className="animate-enter enter-delay-1 p-5 sm:p-6 rounded-xl bg-bg-card border border-border space-y-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-lg bg-bg-primary border border-border min-w-0">
                <item.icon size={16} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-xs font-mono text-text-muted mb-0.5">{item.label}</dt>
                  <dd className={`text-sm text-text-primary ${item.wrap}`}>
                    {item.value || <span className="text-text-muted">{item.empty}</span>}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <PrototypeNotice />

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-border">
            <p className="text-xs text-text-muted">Session ends when you log out or close this tab.</p>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-primary font-semibold text-sm hover:border-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-colors duration-200"
            >
              <LogOut size={16} aria-hidden="true" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
