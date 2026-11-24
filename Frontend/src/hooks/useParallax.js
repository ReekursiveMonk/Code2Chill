import { useEffect } from 'react';
import { motionEnabled, subscribeScroll } from '../utils/motion';

/**
 * Small decorative parallax: moves the element vertically by
 * `speed` × page scroll, capped at `max` pixels. Only on screens 768px and
 * wider, never with reduced motion, and writes the transform directly so
 * React doesn't re-render while scrolling.
 *
 *   const ref = useRef(null);
 *   useParallax(ref, -0.06);
 */
export function useParallax(ref, speed, max = 60) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !motionEnabled() || !window.matchMedia('(min-width: 768px)').matches) return undefined;

    const unsubscribe = subscribeScroll((y) => {
      const offset = Math.max(-max, Math.min(max, y * speed));
      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });

    return () => {
      unsubscribe();
      element.style.transform = '';
    };
  }, [ref, speed, max]);
}
