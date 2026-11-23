import PrototypeNotice from './PrototypeNotice';

/**
 * Shared page shell for the login and signup pages: centred card with a
 * badge, title, subtitle and the prototype notice.
 */
function AuthLayout({ badge, title, subtitle, children, footer }) {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto animate-fade-in-up">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-green-primary bg-green-primary/10 border border-green-primary/20 mb-4">
            {badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-text-secondary text-sm">{subtitle}</p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-bg-card border border-border space-y-6">
          <PrototypeNotice />
          {children}
        </div>

        {footer && <p className="text-center text-sm text-text-secondary mt-6">{footer}</p>}
      </div>
    </div>
  );
}

export default AuthLayout;
