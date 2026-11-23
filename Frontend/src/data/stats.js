import { TEAM_MEMBERS } from './team';

/**
 * Statistics shown in the Home page hero.
 *
 * Members is calculated from the real team data in team.js, so it updates
 * automatically when members are added or removed.
 *
 * SAMPLE DATA: Projects, Events and Workshops are unverified placeholders.
 * They carry `sample: true`, which shows a small "sample" label on the Home
 * page so they aren't presented as confirmed achievements. When you replace a
 * value with a real, verified figure, delete its `sample: true`.
 */

const memberCount = TEAM_MEMBERS.length;

export const HOME_STATS = [
  { value: String(memberCount), label: memberCount === 1 ? 'Member' : 'Members' },
  { value: '10+', label: 'Projects', sample: true },
  { value: '15+', label: 'Events', sample: true },
  { value: '5+', label: 'Workshops', sample: true },
];
