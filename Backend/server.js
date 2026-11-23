import { loadConfig } from './config/env.js';
import { connectDB, disconnectDB, prepareDatabase, describeConnectionError } from './config/db.js';
import { ALL_MODELS } from './models/index.js';
import { createApp } from './app.js';

/**
 * Entry point: load config → connect to MongoDB → start listening.
 * If configuration or the database connection fails, the process exits
 * with a clear message instead of running half-broken.
 */
async function start() {
  let config;
  try {
    config = loadConfig();
  } catch (error) {
    console.error(`[config] ${error.message}`);
    process.exit(1);
  }

  try {
    await connectDB(config.mongodbUri, { dbName: config.dbName });
  } catch (error) {
    console.error('[db] Could not connect to MongoDB:', error.message);
    console.error(`[db] ${describeConnectionError(error)}`);
    process.exit(1);
  }

  // Create required indexes (unique emails, etc.) before accepting requests.
  try {
    await prepareDatabase(ALL_MODELS);
  } catch (error) {
    console.error('[db] Could not prepare database indexes:', error.message);
    if (error.code === 11000) {
      console.error('[db] Existing documents contain duplicates that break a unique index. Remove or merge them, then restart.');
    }
    await disconnectDB().catch(() => {});
    process.exit(1);
  }

  const app = createApp(config);
  const server = app.listen(config.port, () => {
    console.info(`[server] Code2Chill API running on http://localhost:${config.port} (${config.nodeEnv})`);
  });

  // Close connections cleanly on Ctrl+C or when the host stops the process.
  const shutdown = (signal) => {
    console.info(`[server] ${signal} received, shutting down...`);
    server.close(async () => {
      await disconnectDB().catch(() => {});
      process.exit(0);
    });
    // Force exit if something hangs.
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled promise rejection:', reason);
  process.exit(1);
});

start();
