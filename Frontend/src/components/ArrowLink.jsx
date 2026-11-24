import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/**
 * Editorial text link with a hairline underline and a small arrow.
 * Use for "see all" style links. Internal: `to`. External: `href`.
 */
function ArrowLink({ to, href, children, className = '', ...rest }) {
  const classes = `group inline-flex items-end gap-2 min-h-[2.75rem] pb-1.5 border-b border-ink text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-accent-ink hover:border-accent ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    );
  }

  return (
    <Link to={to} className={classes} {...rest}>
      {children}
      <ArrowRight
        size={15}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}

export default ArrowLink;
