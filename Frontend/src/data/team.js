/**
 * Code2Chill team.
 *
 * This is the single source of truth for team members. The Team page renders
 * these groups, and the Home page member count is calculated from them, so
 * adding or removing someone here updates both automatically.
 *
 * Optional fields (leave them out rather than adding placeholders):
 *   bio     - short description, shown only when present
 *   github, linkedin, twitter - full profile URLs, shown only when present
 *   avatar  - image path; initials are shown when absent
 */

export const TEAM_DATA = {
  leads: [
    {
      name: 'Lakshay',
      role: 'President',
    },
    {
      name: 'Jiya',
      role: 'Vice President',
    },
  ],
  core: [
    {
      name: 'Samanyu',
      role: 'Tech Head',
    },
    {
      name: 'Prince Pratik',
      role: 'Member',
      github: 'https://github.com/ReekursiveMonk',
    },
  ],
};

// Every member across all groups, in display order.
export const TEAM_MEMBERS = Object.values(TEAM_DATA).flat();
