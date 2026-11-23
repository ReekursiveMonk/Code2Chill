import { loadConfig } from '../config/env.js';
import { connectDB, disconnectDB, prepareDatabase, describeConnectionError } from '../config/db.js';
import TeamMember from '../models/TeamMember.js';
import Event from '../models/Event.js';
import Project from '../models/Project.js';
import { TEAM_MEMBERS, SAMPLE_EVENTS, PROJECTS } from '../data/seedData.js';

/**
 * Loads the club's content into MongoDB.
 *
 *   npm run seed                          team + projects + sample events
 *   npm run seed -- --no-samples          team + real projects only
 *   npm run seed -- --remove-samples      delete everything marked isSample
 *
 * Safe to run more than once: records are matched by name (team) or title
 * (events, projects) and updated in place, never duplicated. Only the fields
 * listed in data/seedData.js are written; anything else you add to a record
 * (e.g. a bio) is kept. It never reads, creates or changes user accounts or
 * Join applications, and only deletes data when you pass --remove-samples.
 */

const args = new Set(process.argv.slice(2));

async function upsertAll(Model, items, key) {
  for (const item of items) {
    await Model.updateOne({ [key]: item[key] }, { $set: item }, { upsert: true, runValidators: true });
  }
  return items.length;
}

async function run() {
  const config = loadConfig();
  try {
    await connectDB(config.mongodbUri, { dbName: config.dbName });
  } catch (error) {
    error.message = `${error.message}\n${describeConnectionError(error)}`;
    throw error;
  }
  // Unique indexes on name/title must exist so re-running never duplicates.
  await prepareDatabase([TeamMember, Event, Project]);

  if (args.has('--remove-samples')) {
    const events = await Event.deleteMany({ isSample: true });
    const projects = await Project.deleteMany({ isSample: true });
    console.info(`Removed ${events.deletedCount} sample events and ${projects.deletedCount} sample projects.`);
    return;
  }

  const includeSamples = !args.has('--no-samples');

  const team = await upsertAll(TeamMember, TEAM_MEMBERS, 'name');
  console.info(`Team: ${team} members saved.`);

  const projects = includeSamples ? PROJECTS : PROJECTS.filter((project) => !project.isSample);
  console.info(`Projects: ${await upsertAll(Project, projects, 'title')} saved.`);

  if (includeSamples) {
    console.info(`Events: ${await upsertAll(Event, SAMPLE_EVENTS, 'title')} sample events saved.`);
  } else {
    console.info('Events: skipped sample events.');
  }
}

run()
  .then(() => console.info('Seeding finished.'))
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => disconnectDB().catch(() => {}));
