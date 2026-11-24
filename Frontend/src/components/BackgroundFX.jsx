/**
 * Site-wide paper texture, fixed behind every page.
 *
 * One static layer of very faint grain on top of the paper colour set on
 * <body>. No animation, no blur, no gradients. It sits at -z-10 inside the
 * app's `isolate` wrapper, so it never covers content or captures clicks.
 */
function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-grain opacity-[0.035] mix-blend-multiply" />
    </div>
  );
}

export default BackgroundFX;
