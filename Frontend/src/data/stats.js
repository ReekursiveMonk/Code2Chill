/**
 * Statistics shown in the Home page hero, besides the member count.
 *
 * The Members figure is NOT stored here: the Home page loads it from the
 * backend (GET /api/team → count), so it always matches the real team.
 *
 * SAMPLE DATA: Projects, Events and Workshops are unverified placeholders.
 * They carry `sample: true`, which shows a small "Sample figure" label on the
 * Home page so they aren't presented as confirmed achievements. When you
 * replace a value with a real, verified figure, delete its `sample: true`.
 */

export const OTHER_STATS = [
  { value: '10+', label: 'Projects', sample: true },
  { value: '15+', label: 'Events', sample: true },
  { value: '5+', label: 'Workshops', sample: true },
];
