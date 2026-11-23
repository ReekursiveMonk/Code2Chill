import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

/**
 * Builds the Express app. Kept separate from server.js so the app can be
 * created without opening a port (useful for tests later).
 */
export function createApp(config) {
  const app = express();

  // Make config available to middleware and controllers (res.app.locals.config).
  app.locals.config = config;

  app.disable('x-powered-by');

  // Only the configured frontend origin(s) may call the API from a browser.
  // Requests without an Origin header (curl, Postman, server-to-server) are allowed.
  app.use(
    cors({
      origin(origin, callback) {
        callback(null, !origin || config.clientOrigins.includes(origin));
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Parse JSON bodies; small limit because the API only receives form data.
  app.use(express.json({ limit: '10kb' }));

  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
