import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Jumps to the top of the page on every route change.
 * `behavior: 'instant'` overrides the site-wide smooth scrolling (used for
 * in-page #anchor links), so a new page never visibly scrolls up.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
