import User from './User.js';
import JoinApplication from './JoinApplication.js';
import Event from './Event.js';
import Project from './Project.js';
import TeamMember from './TeamMember.js';

/** Every model, so startup can prepare all indexes in one place. */
export const ALL_MODELS = [User, JoinApplication, Event, Project, TeamMember];

export { User, JoinApplication, Event, Project, TeamMember };
