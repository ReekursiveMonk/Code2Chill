/**
 * Section heading used across all pages.
 *
 * Neo-brutalist label (solid lime tag with a hard offset shadow) above a
 * large, high-contrast display heading.
 *
 * Props:
 *   badge        short label text (optional)
 *   title        heading text
 *   description  supporting paragraph (optional)
 *   align        'center' (default) or 'left'
 */
function SectionHeading({ badge, title, description, align = 'center' }) {
  const isLeft = align === 'left';

  return (
    <div className={`max-w-2xl mb-12 ${isLeft ? 'text-left' : 'text-center mx-auto'}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-md border-2 border-green-primary bg-green-primary text-bg-primary text-[11px] font-mono font-bold uppercase tracking-[0.18em] shadow-[3px_3px_0_0_var(--color-text-primary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-bg-primary" aria-hidden="true" />
          {badge}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-5">
        {title}
      </h2>
      {description && (
        <p className={`text-text-secondary text-base sm:text-lg leading-relaxed ${isLeft ? '' : 'mx-auto'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
