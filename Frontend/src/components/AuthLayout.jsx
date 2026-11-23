/**
 * Shared page shell for the login and signup pages: centred card with a
 * badge, title and subtitle.
 */
function AuthLayout({ badge, title, subtitle, children, footer }) {
  return (
    <div className="pt-24 pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="animate-enter text-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md border border-accent/50 text-accent text-[11px] font-mono font-bold uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 bg-accent-2" aria-hidden="true" />
            {badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-text-secondary text-sm">{subtitle}</p>
        </div>

        <div className="animate-enter enter-delay-1 p-5 sm:p-6 rounded-xl bg-bg-card border border-border space-y-5">
          {children}
        </div>

        {footer && <p className="animate-enter enter-delay-2 text-center text-sm text-text-secondary mt-5">{footer}</p>}
      </div>
    </div>
  );
}

export default AuthLayout;
