/**
 * Illustrated preview of the Code2Chill website, drawn as a minimal browser
 * window (no image file). Decorative: screen readers get one short label.
 */
function Bar({ className = '' }) {
  return <span className={`block h-1.5 bg-ink/15 ${className}`} />;
}

function SitePreview({ className = '' }) {
  return (
    <figure
      role="img"
      aria-label="Preview of the Code2Chill website: Build. Connect. Innovate."
      className={`mx-auto w-full max-w-4xl border border-ink bg-bg-card text-center ${className}`}
    >
      <div aria-hidden="true">
        {/* Browser top bar */}
        <div className="flex items-center gap-3 border-b border-ink px-3 sm:px-4 py-2.5">
          <span className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand" />
            <span className="w-2.5 h-2.5 rounded-full bg-sage" />
          </span>
          <span className="mx-auto min-w-0 max-w-xs flex-1 truncate border border-border bg-bg-primary px-3 py-1 font-mono text-[10px] sm:text-[11px] text-text-muted">
            code2-chill.vercel.app
          </span>
          <span className="w-[3.25rem] shrink-0 hidden sm:block" />
        </div>

        {/* Page */}
        <div className="px-5 sm:px-10 pt-5 sm:pt-6 pb-8 sm:pb-12">
          {/* Mini navbar */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-baseline text-text-primary">
              <span className="font-mono text-[10px] text-accent">&lt;</span>
              <span className="font-display text-sm sm:text-base tracking-[-0.03em]">Code2Chill</span>
              <span className="font-mono text-[10px] text-accent">/&gt;</span>
            </span>
            <span className="flex items-center gap-2 sm:gap-3">
              <Bar className="w-6 sm:w-8" />
              <Bar className="w-6 sm:w-8 hidden sm:block" />
              <Bar className="w-6 sm:w-8 hidden sm:block" />
              <span className="block h-4 w-9 sm:w-11 bg-ink" />
            </span>
          </div>

          {/* Hero */}
          <div className="mt-10 sm:mt-14">
            <p className="eyebrow !text-[9px] sm:!text-[10px]">Chitkara University · Coding Club</p>
            <p className="mt-4 font-display text-[clamp(1.75rem,5.5vw,3.75rem)] leading-[0.95] tracking-[-0.04em] text-text-primary">
              Build. Connect. <em className="text-accent">Innovate.</em>
            </p>
            <p className="mt-4 text-xs sm:text-sm text-text-secondary">
              A community of builders, learners and innovators.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="block h-6 sm:h-7 w-20 sm:w-24 bg-accent" />
              <span className="block h-6 sm:h-7 w-20 sm:w-24 border border-ink" />
            </div>
          </div>

          {/* Abstract content cards */}
          <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-2 sm:gap-4">
            {['bg-sage', 'bg-sand', 'bg-bg-secondary'].map((tone) => (
              <div key={tone} className="border border-border p-2 sm:p-3">
                <span className={`block aspect-[4/3] ${tone}`} />
                <Bar className="mt-2 sm:mt-3 w-3/4 mx-auto" />
                <Bar className="mt-1.5 w-1/2 mx-auto !bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

export default SitePreview;
