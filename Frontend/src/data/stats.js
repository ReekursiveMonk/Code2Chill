import { TEAM_MEMBERS } from './team';

/**
 * Statistics shown in the Home page hero.
 *
 * Members is calculated from the real team data in team.js, so it updates
 * automatically when members are added or removed.
 *
 * SAMPLE DATA: Projects, Events and Workshops are still placeholders.
 * Replace them with real club figures before launch.
 */

const memberCount = TEAM_MEMBERS.length;

export const HOME_STATS = [
  { value: String(memberCount), label: memberCount === 1 ? 'Member' : 'Members' },
  { value: '10+', label: 'Projects' },
  { value: '15+', label: 'Events' },
  { value: '5+', label: 'Workshops' },
];
