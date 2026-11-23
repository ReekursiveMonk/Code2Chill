/**
 * Site-wide atmospheric background, fixed behind every page.
 *
 * Three static layers (no animation, no blur filters):
 *  1. Layered radial lime/green light on a dark green-black base
 *  2. A faint technical grid that fades out towards the edges
 *  3. Fine film grain for texture
 *
 * It sits at -z-10 inside the app's `isolate` wrapper, so it always stays
 * behind content and never captures clicks.
 */
function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-atmosphere" />
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-grain opacity-[0.045]" />
    </div>
  );
}

export default BackgroundFX;
