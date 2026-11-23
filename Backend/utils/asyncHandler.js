/**
 * Wraps an async route handler so any thrown error or rejected promise is
 * passed to Express's error handler instead of crashing the request.
 */
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

export default asyncHandler;
