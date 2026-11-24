import { useLayoutEffect, useRef } from 'react';
import { motionEnabled, observeOnce } from '../utils/motion';

/**
 * Scroll-triggered reveal. Content is always rendered; motion is only a
 * transition from a hidden start state, applied when it is safe to do so.
 *
 *   <Reveal>…</Reveal>                       fade + rise 20px
 *   <Reveal variant="scale" delay={120}>…    fade + rise + slight scale
 *   <Reveal variant="fade">…                 fade only
 *   <Stagger as="ul">…<li/>…</Stagger>       children appear one by one
 *
 * How it works: before the first paint the element gets data-reveal="hidden"
 * (CSS in index.css hides it); the shared IntersectionObserver switches it
 * to "shown" once, when it scrolls into view. The attribute is set on the
 * DOM node directly, so revealing never re-renders React.
 *
 * With reduced motion, or without IntersectionObserver, nothing is hidden.
 * Don't put Reveal directly on a button or link that has its own hover
 * transform; wrap it instead.
 */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !motionEnabled()) return undefined;
    element.dataset.reveal = 'hidden';
    const stop = observeOnce(element, () => {
      element.dataset.reveal = 'shown';
    });
    return () => {
      stop();
      element.dataset.reveal = 'shown';
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      className={className}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Reveals its direct children one after another (about 80ms apart). */
export function Stagger(props) {
  return <Reveal {...props} variant="stagger" />;
}

export default Reveal;
