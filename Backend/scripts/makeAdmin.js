import { loadConfig } from '../config/env.js';
import { connectDB, disconnectDB } from '../config/db.js';
import User, { ROLES } from '../models/User.js';

/**
 * Changes the role of an EXISTING account. Admin access can only be granted
 * by someone with access to the server and database, never through the API.
 *
 *   npm run make-admin -- someone@example.com            → admin
 *   npm run make-admin -- someone@example.com member     → back to member
 *
 * The person must sign up on the website first. No passwords are created here.
 */

const [emailArg, roleArg = 'admin'] = process.argv.slice(2);

async function run() {
  if (!emailArg) {
    throw new Error('Usage: npm run make-admin -- <email> [admin|member]');
  }
  if (!ROLES.includes(roleArg)) {
    throw new Error(`Role must be one of: ${ROLES.join(', ')}.`);
  }

  const config = loadConfig();
  await connectDB(config.mongodbUri);

  const email = emailArg.trim().toLowerCase();
  const user = await User.findOneAndUpdate({ email }, { role: roleArg }, { new: true });
  if (!user) {
    throw new Error(`No account found for ${email}. Sign up on the website first.`);
  }

  console.info(`${user.email} is now: ${user.role}.`);
}

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => disconnectDB().catch(() => {}));
