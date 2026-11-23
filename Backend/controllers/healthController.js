import { getDbStatus } from '../config/db.js';

/**
 * GET /api/health
 * 200 when the API and database are both available, 503 if the database
 * connection has dropped. Useful for uptime checks and local debugging.
 */
export const getHealth = (_req, res) => {
  const database = getDbStatus();
  const healthy = database === 'connected';

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    database,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
};
