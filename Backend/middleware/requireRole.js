import ApiError from '../utils/ApiError.js';

/**
 * Role-based access. Use after requireAuth:
 *
 *   router.get('/', requireAuth, requireRole('admin'), handler);
 *
 * Logged-in users without the role get 403 Forbidden.
 */
export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Please log in to continue.'));
  }
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to do this.'));
  }
  return next();
};
