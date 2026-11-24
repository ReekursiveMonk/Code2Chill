import { Link } from 'react-router-dom';

/**
 * Wordmark. Keeps the original <Code2Chill/> brand motif: serif name with
 * the angle brackets set small in mono and terracotta.
 */
function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Code2Chill home"
      className={`inline-flex items-baseline py-2.5 text-text-primary ${className}`}
    >
      <span aria-hidden="true" className="font-mono text-sm text-accent mr-0.5">&lt;</span>
      <span className="font-display text-[1.375rem] font-medium tracking-[-0.03em]">Code2Chill</span>
      <span aria-hidden="true" className="font-mono text-sm text-accent ml-0.5">/&gt;</span>
    </Link>
  );
}

export default Logo;
