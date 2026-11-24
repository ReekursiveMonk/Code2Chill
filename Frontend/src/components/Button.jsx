import { Link } from 'react-router-dom';

/**
 * Shared button. Renders a router <Link> when given `to`, an <a> when given
 * `href`, and a <button> otherwise, so every call to action looks the same.
 *
 *   <Button to="/join">Join the Club</Button>
 *   <Button variant="outline" size="sm" onClick={...}>Log out</Button>
 *
 * variant: 'primary' (terracotta, default) | 'dark' (ink) | 'outline'
 * size:    'md' (default) | 'sm'
 */
const VARIANTS = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  outline: 'btn-outline',
};

function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const classes = `btn ${VARIANTS[variant] || VARIANTS.primary} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
