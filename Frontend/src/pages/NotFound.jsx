import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="pt-24 pb-14 min-h-[60vh] flex items-center">
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Error code */}
          <p className="animate-enter text-center font-mono font-bold text-6xl sm:text-7xl text-accent mb-4">
            404
          </p>

          <SectionHeading
            badge="Error 404"
            title="Page Not Found"
            description="The page you're looking for doesn't exist or may have been moved."
          />

          {/* Requested path */}
          <div className="animate-enter enter-delay-1 max-w-md mx-auto mb-8 p-4 rounded-xl bg-bg-card border border-border font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-text-muted mb-2">
              <Terminal size={14} className="text-accent" />
              <span>request</span>
            </div>
            <p className="text-text-secondary break-all">
              <span className="text-accent">&gt; GET</span> {pathname}
            </p>
            <p className="text-text-muted mt-1">404 Not Found</p>
          </div>

          {/* Back home */}
          <div className="animate-enter enter-delay-2 flex justify-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-semibold text-sm
                         hover:bg-accent-2 transition-colors duration-200"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
