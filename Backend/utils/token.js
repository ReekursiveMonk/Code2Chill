import jwt from 'jsonwebtoken';

/**
 * JSON Web Token helpers.
 *
 * The token only contains the user's id (`sub`) and role. Everything else is
 * loaded fresh from the database on each authenticated request.
 */

const ALGORITHM = 'HS256';

export function signToken(user, { secret, expiresIn }) {
  return jwt.sign({ role: user.role }, secret, {
    subject: String(user._id),
    expiresIn,
    algorithm: ALGORITHM,
  });
}

export function verifyToken(token, { secret }) {
  // Pinning the algorithm prevents "alg" switching attacks.
  return jwt.verify(token, secret, { algorithms: [ALGORITHM] });
}
