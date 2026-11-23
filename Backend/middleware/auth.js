import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/token.js';

/**
 * Protects a route: requires a valid "Authorization: Bearer <token>" header.
 * On success, the logged-in user (without password) is available as req.user.
 */
export const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.get('Authorization') || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Please log in to continue.');
  }

  let payload;
  try {
    payload = verifyToken(token, { secret: req.app.locals.config.jwtSecret });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Your session has expired. Please log in again.');
    }
    throw new ApiError(401, 'Invalid login token. Please log in again.');
  }

  // Load the user fresh so deleted accounts or role changes take effect.
  const user = payload.sub ? await User.findById(payload.sub) : null;
  if (!user) {
    throw new ApiError(401, 'This account no longer exists. Please log in again.');
  }

  req.user = user;
  next();
});
