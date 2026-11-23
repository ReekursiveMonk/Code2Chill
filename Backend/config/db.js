import mongoose from 'mongoose';

/**
 * Reusable MongoDB connection helpers.
 *
 * - connectDB() resolves once connected and rejects if MongoDB can't be
 *   reached within 10 seconds, so server.js can stop with a clear message.
 * - prepareDatabase() creates the indexes the app relies on (e.g. unique
 *   emails) BEFORE the server accepts requests. It only creates missing
 *   indexes; it never drops indexes, collections or documents.
 * - describeConnectionError() turns common Atlas errors into plain advice.
 *   The connection string is never printed, because it contains the password.
 */

const READY_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

let listenersAttached = false;

function attachListeners() {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] MongoDB disconnected.');
  });
  mongoose.connection.on('reconnected', () => {
    console.info('[db] MongoDB reconnected.');
  });
  mongoose.connection.on('error', (error) => {
    console.error('[db] MongoDB error:', error.message);
  });
}

/**
 * @param {string} uri     MONGODB_URI
 * @param {object} options { dbName } – the database to use inside the cluster
 */
export async function connectDB(uri, { dbName } = {}) {
  mongoose.set('strictQuery', true);
  attachListeners();

  const connection = await mongoose.connect(uri, {
    dbName,
    // Indexes are created explicitly by prepareDatabase(), in a known order.
    autoIndex: false,
    // Fail fast (10s) instead of hanging when the database is unreachable.
    serverSelectionTimeoutMS: 10000,
  });

  const { host, name } = connection.connection;
  console.info(`[db] Connected to MongoDB at ${host} (database: ${name}).`);
  return connection;
}

/**
 * Runs one-time data fixes, then makes sure every model's indexes exist.
 * Safe to run on every start: existing indexes and data are left alone.
 */
export async function prepareDatabase(models) {
  for (const model of models) {
    if (typeof model.prepareData === 'function') {
      await model.prepareData();
    }
  }
  for (const model of models) {
    await model.createIndexes();
  }
  console.info(`[db] Indexes ready for ${models.length} collections.`);
}

export async function disconnectDB() {
  await mongoose.connection.close();
}

export function getDbStatus() {
  return READY_STATES[mongoose.connection.readyState] || 'unknown';
}

/** Plain-language hint for the most common connection problems. */
export function describeConnectionError(error) {
  const message = String(error?.message || '');
  const code = error?.code;

  if (code === 18 || code === 8000 || /bad auth|authentication failed/i.test(message)) {
    return 'The username or password in MONGODB_URI was rejected. Check the database user in Atlas → Database Access. If the password contains special characters (@ : / ? # [ ] %), URL-encode them or choose a password without them.';
  }
  if (/querySrv|ENOTFOUND|EREFUSED|getaddrinfo/i.test(message)) {
    return 'The cluster address in MONGODB_URI could not be found. Check the host part (…@cluster0.xxxxx.mongodb.net) and your internet connection. Some networks block the DNS lookups used by mongodb+srv:// links; try another network (e.g. a phone hotspot).';
  }
  if (/Invalid scheme|URI|parse/i.test(message) || error?.name === 'MongoParseError') {
    return 'MONGODB_URI is not a valid connection string. Copy it again from Atlas → Connect → Drivers and replace only the password placeholder.';
  }
  if (error?.name === 'MongooseServerSelectionError' || /Server selection timed out|whitelist|IP/i.test(message)) {
    return 'Could not reach the cluster in time. In Atlas → Network Access, add your current IP address. Also check that the cluster is not paused, and that your network allows outgoing connections on port 27017 (some college/office Wi-Fi blocks it).';
  }
  return 'Check MONGODB_URI in .env and that the database is reachable.';
}
