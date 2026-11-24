/**
 * Shared motion helpers (no dependencies).
 *
 * - motionEnabled(): false when the browser can't observe intersections or
 *   the visitor prefers reduced motion. Callers then show content at once.
 * - observeOnce(el, callback): one shared IntersectionObserver for the whole
 *   site. The callback runs the first time `el` scrolls into view, then the
 *   element is unobserved. Returns a cleanup function.
 * - subscribeScroll(callback): one shared, passive scroll/resize listener,
 *   throttled to one call per animation frame. Returns an unsubscribe
 *   function; the listener is removed when nobody is subscribed.
 */

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function motionEnabled() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return false;
  return !window.matchMedia?.(REDUCED_MOTION).matches;
}

/* ───────── Reveal-on-scroll ───────── */

let observer = null;
const callbacks = new Map();

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const callback = callbacks.get(entry.target);
          observer.unobserve(entry.target);
          callbacks.delete(entry.target);
          callback?.();
        }
      },
      // Start a little before the element is fully in view; threshold 0 so
      // very tall elements (long grids) still trigger.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );
  }
  return observer;
}

export function observeOnce(element, callback) {
  const io = getObserver();
  callbacks.set(element, callback);
  io.observe(element);
  return () => {
    io.unobserve(element);
    callbacks.delete(element);
  };
}

/* ───────── Scroll position (rAF-throttled) ───────── */

const scrollSubscribers = new Set();
let frameRequested = false;

function notify() {
  frameRequested = false;
  const y = window.scrollY;
  for (const subscriber of scrollSubscribers) subscriber(y);
}

function onScroll() {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(notify);
}

export function subscribeScroll(callback) {
  scrollSubscribers.add(callback);
  if (scrollSubscribers.size === 1) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }
  callback(window.scrollY);
  return () => {
    scrollSubscribers.delete(callback);
    if (scrollSubscribers.size === 0) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };
}
