import { loadConfig } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
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
    await connectDB(config.mongodbUri);
  } catch (error) {
    console.error('[db] Could not connect to MongoDB:', error.message);
    console.error('[db] Check MONGODB_URI in .env and that the database is reachable.');
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
