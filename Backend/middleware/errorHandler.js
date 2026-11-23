import ApiError from '../utils/ApiError.js';

/**
 * 404 for any route that doesn't exist.
 */
export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

/**
 * Central error handler. Every error response has the same shape:
 *   { "message": "...", "errors": { "field": "..." } }   // errors is optional
 */
// Express recognises error handlers by their four arguments, so `next` must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let status = 500;
  let message = 'Something went wrong. Please try again later.';
  let errors;

  if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err?.type === 'entity.parse.failed') {
    // Malformed JSON body
    status = 400;
    message = 'Request body must be valid JSON.';
  } else if (err?.type === 'entity.too.large') {
    status = 413;
    message = 'Request body is too large.';
  } else if (err?.name === 'ValidationError' && err.errors) {
    // Mongoose schema validation
    status = 400;
    message = 'Please fix the highlighted fields.';
    errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, detail]) => [field, detail.message])
    );
  } else if (err?.code === 11000) {
    // Duplicate key (e.g. two signups with the same email at the same moment)
    status = 409;
    const field = Object.keys(err.keyValue || { email: true })[0];
    message =
      field === 'email' ? 'An account with this email already exists.' : `Duplicate value for ${field}.`;
    errors = { [field]: message };
  } else if (err?.name === 'CastError') {
    status = 400;
    message = 'Invalid identifier.';
  }

  if (status >= 500) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  }

  const body = { message };
  if (errors) body.errors = errors;

  // In development, include the stack trace for unexpected errors.
  if (status >= 500 && !req.app.locals.config?.isProduction && err?.stack) {
    body.stack = err.stack;
  }

  res.status(status).json(body);
}
