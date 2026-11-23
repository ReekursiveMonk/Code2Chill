import mongoose from 'mongoose';

/**
 * Reusable MongoDB connection helpers.
 *
 * connectDB() resolves once connected and rejects if MongoDB can't be
 * reached within the timeout, so server.js can stop with a clear message.
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

export async function connectDB(uri) {
  mongoose.set('strictQuery', true);
  attachListeners();

  const connection = await mongoose.connect(uri, {
    // Fail fast (10s) instead of hanging when the database is unreachable.
    serverSelectionTimeoutMS: 10000,
  });

  const { host, name } = connection.connection;
  console.info(`[db] Connected to MongoDB at ${host} (database: ${name}).`);
  return connection;
}

export async function disconnectDB() {
  await mongoose.connection.close();
}

export function getDbStatus() {
  return READY_STATES[mongoose.connection.readyState] || 'unknown';
}
