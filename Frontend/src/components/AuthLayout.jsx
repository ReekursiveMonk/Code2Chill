/**
 * Shared page shell for the login and signup pages.
 *
 * Editorial split: a large serif headline with a short note on the left,
 * the form on the right (asymmetric 7/5 on desktop, stacked on mobile).
 *
 * Props:
 *   badge     small label above the headline
 *   title     the headline (string or JSX)
 *   subtitle  one sentence under the headline
 *   aside     optional extra content under the subtitle (desktop and mobile)
 *   children  the form
 *   footer    line under the form (e.g. link to the other auth page)
 */
function AuthLayout({ badge, title, subtitle, aside, children, footer }) {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="wrap">
        <div className="rule-ink pt-3 animate-enter">
          <p className="eyebrow !text-text-primary">{badge}</p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 animate-enter enter-delay-1">
            <h1 className="display-lg text-text-primary">{title}</h1>
            <p className="lede mt-6">{subtitle}</p>
            {aside && <div className="mt-10 hidden lg:block">{aside}</div>}
          </div>

          <div className="lg:col-span-5 animate-enter enter-delay-2">
            <div className="border-t border-ink pt-8 space-y-6">{children}</div>
            {footer && <p className="mt-8 pt-6 border-t border-border text-sm text-text-secondary">{footer}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
