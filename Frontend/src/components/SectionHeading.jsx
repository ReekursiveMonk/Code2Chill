/**
 * Section heading used across all pages.
 *
 * A restrained mono label (thin amber outline with a small orange marker)
 * above a large, bold display heading.
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
    <div className={`animate-enter max-w-2xl mb-8 ${isLeft ? 'text-left' : 'text-center mx-auto'}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md border border-accent/50 text-accent text-[11px] font-mono font-bold uppercase tracking-[0.18em]">
          <span className="w-1.5 h-1.5 bg-accent-2" aria-hidden="true" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
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
