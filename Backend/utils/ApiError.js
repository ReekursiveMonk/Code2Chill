/**
 * An error with an HTTP status code, thrown from controllers or middleware
 * and turned into a JSON response by middleware/errorHandler.js.
 *
 *   throw new ApiError(401, 'Invalid email or password.');
 *   throw new ApiError(400, 'Please fix the highlighted fields.', { email: '...' });
 */
export default class ApiError extends Error {
  constructor(statusCode, message, errors = undefined) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
