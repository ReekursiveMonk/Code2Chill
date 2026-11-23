import 'dotenv/config';

/**
 * Reads and checks environment variables once, at startup.
 * Importing this file also loads `.env` (via dotenv).
 *
 * The server refuses to start if a required value is missing or unsafe,
 * so configuration mistakes show up immediately instead of at runtime.
 */

const MIN_SECRET_LENGTH = 32;

function readList(value) {
  return (value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function loadConfig(env = process.env) {
  const problems = [];

  const mongodbUri = (env.MONGODB_URI || '').trim();
  if (!mongodbUri) {
    problems.push('MONGODB_URI is missing. Add your MongoDB connection string to .env.');
  } else if (!/^mongodb(\+srv)?:\/\//.test(mongodbUri)) {
    problems.push('MONGODB_URI must start with mongodb+srv:// (Atlas) or mongodb:// (local).');
  } else if (/<[A-Za-z_]+>/.test(mongodbUri)) {
    problems.push(
      'MONGODB_URI still contains a placeholder like <db_password>. Replace it (and the < > brackets) with your real value.'
    );
  }

  const dbName = (env.MONGODB_DB_NAME || 'code2chill').trim();
  if (!/^[A-Za-z0-9_-]{1,38}$/.test(dbName)) {
    problems.push('MONGODB_DB_NAME may only contain letters, numbers, - and _ (max 38 characters).');
  }

  if (!env.JWT_SECRET) {
    problems.push('JWT_SECRET is missing. Add a long random string to .env.');
  } else if (env.JWT_SECRET.length < MIN_SECRET_LENGTH) {
    problems.push(`JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters long.`);
  }

  const port = Number(env.PORT || 5000);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    problems.push('PORT must be a whole number between 1 and 65535.');
  }

  if (problems.length > 0) {
    const error = new Error(`Invalid configuration:\n  - ${problems.join('\n  - ')}`);
    error.isConfigError = true;
    throw error;
  }

  return Object.freeze({
    port,
    nodeEnv: env.NODE_ENV || 'development',
    isProduction: env.NODE_ENV === 'production',
    mongodbUri,
    dbName,
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN || '7d',
    clientOrigins: readList(env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:4173'),
  });
}
