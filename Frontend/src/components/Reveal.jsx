import { useEffect, useRef, useState } from 'react';

/**
 * Fades and lifts its children into view the first time they scroll on
 * screen. Uses IntersectionObserver only (no animation library).
 *
 * - Animates opacity and transform only, so there is no layout shift.
 * - With prefers-reduced-motion the global CSS rule makes it appear instantly.
 * - If IntersectionObserver isn't available, content is shown immediately.
 *
 * Wrap cards in <Reveal> instead of adding it to an element that has its own
 * hover transform, so the two transforms don't conflict.
 */
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-[450ms] ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
