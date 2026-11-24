/**
 * Editorial page opener used at the top of inner pages.
 *
 * A heavy top rule with a label and an optional index number, then a large
 * serif title on the left and a short intro on the right (asymmetric 8/4
 * grid on desktop, stacked on mobile). It includes its own top padding to
 * clear the fixed navbar.
 *
 * Props:
 *   eyebrow  label on the rule (e.g. "Events")
 *   index    small mono marker on the right of the rule (e.g. "02")
 *   title    the headline (string or JSX; use <em> for an italic accent word)
 *   intro    intro paragraph (optional)
 *   children extra content under the intro (e.g. filters or a button)
 */
function PageHeader({ eyebrow, index, title, intro, children }) {
  return (
    <header className="pt-28 sm:pt-36 pb-10 sm:pb-14">
      <div className="wrap">
        <div className="rule-draw pt-3 flex items-baseline justify-between animate-enter">
          <p className="eyebrow !text-text-primary">{eyebrow}</p>
          {index && (
            <p className="eyebrow" aria-hidden="true">
              {index}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <h1 className="display-lg text-text-primary lg:col-span-8 animate-enter enter-delay-1">
            {title}
          </h1>
          {(intro || children) && (
            <div className="lg:col-span-4 animate-enter enter-delay-2">
              {intro && <p className="lede text-base sm:text-lg">{intro}</p>}
              {children && <div className={intro ? 'mt-6' : ''}>{children}</div>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
