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

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto animate-fade-in-up">
        <div className="p-6 sm:p-8 rounded-2xl bg-bg-card border border-border">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left mb-8">
            <div className="w-20 h-20 rounded-full bg-green-primary/10 border border-green-primary/30 flex items-center justify-center text-green-primary font-mono text-2xl font-bold shrink-0">
              {getUserInitials(user)}
            </div>
            <div className="min-w-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-green-primary bg-green-primary/10 border border-green-primary/20 mb-3">
                Your Profile
              </span>
              <h1 className="text-2xl font-bold text-text-primary tracking-tight break-words">
                {user.name || 'Code2Chill Member'}
              </h1>
              <p className="text-text-secondary text-sm break-all">{user.email}</p>
            </div>
          </div>

          {/* Details */}
          <dl className="divide-y divide-border border-y border-border mb-6">
            <div className="flex items-start gap-3 py-4">
              <User size={16} className="text-green-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-xs font-mono text-text-muted mb-0.5">Name</dt>
                <dd className="text-sm text-text-primary break-words">
                  {user.name || (
                    <span className="text-text-muted">
                      Not provided. Log in doesn&apos;t ask for a name yet.
                    </span>
                  )}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3 py-4">
              <Mail size={16} className="text-green-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-xs font-mono text-text-muted mb-0.5">Email</dt>
                <dd className="text-sm text-text-primary break-all">{user.email}</dd>
              </div>
            </div>
          </dl>

          <div className="mb-6">
            <PrototypeNotice />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border text-text-primary font-semibold text-sm hover:border-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
