import bcrypt from 'bcrypt';
import User, { SALT_ROUNDS } from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validateSignup, validateLogin } from '../utils/validation.js';
import { signToken } from '../utils/token.js';

const INVALID_LOGIN = 'Invalid email or password.';
const VALIDATION_FAILED = 'Please fix the highlighted fields.';

// Used when a login email doesn't exist, so the response takes about as long
// as a real password check and doesn't reveal which emails are registered.
let dummyHashPromise;
const getDummyHash = () => {
  dummyHashPromise ??= bcrypt.hash('code2chill-timing-placeholder', SALT_ROUNDS);
  return dummyHashPromise;
};

function authResponse(res, statusCode, user, message) {
  const { jwtSecret, jwtExpiresIn } = res.app.locals.config;
  const token = signToken(user, { secret: jwtSecret, expiresIn: jwtExpiresIn });
  return res.status(statusCode).json({ message, token, user: user.toPublic() });
}

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
export const signup = asyncHandler(async (req, res) => {
  const { values, errors } = validateSignup(req.body);
  if (errors) throw new ApiError(400, VALIDATION_FAILED, errors);

  const existing = await User.exists({ email: values.email });
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists.', {
      email: 'An account with this email already exists.',
    });
  }

  // The password is hashed by the model's pre-save hook.
  // role is never taken from the request body; new users are always members.
  const user = await User.create({
    name: values.name,
    email: values.email,
    password: values.password,
  });

  return authResponse(res, 201, user, 'Account created.');
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = asyncHandler(async (req, res) => {
  const { values, errors } = validateLogin(req.body);
  if (errors) throw new ApiError(400, VALIDATION_FAILED, errors);

  const user = await User.findOne({ email: values.email }).select('+password');

  if (!user) {
    await bcrypt.compare(values.password, await getDummyHash());
    throw new ApiError(401, INVALID_LOGIN);
  }

  const passwordMatches = await user.comparePassword(values.password);
  if (!passwordMatches) throw new ApiError(401, INVALID_LOGIN);

  return authResponse(res, 200, user, 'Logged in.');
});

/**
 * GET /api/auth/me
 * Header: Authorization: Bearer <token>
 * req.user is set by the requireAuth middleware.
 */
export const getMe = (req, res) => {
  res.status(200).json({ user: req.user.toPublic() });
};
