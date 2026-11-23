/**
 * Input validation for authentication requests.
 *
 * The rules and messages match the frontend (Frontend/src/utils/validation.js)
 * so users see the same feedback whether a check runs in the browser or here.
 * Any email domain is accepted.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = Object.freeze({
  NAME_MIN: 2,
  NAME_MAX: 50,
  EMAIL_MAX: 254,
  PASSWORD_MIN: 8,
  // bcrypt only uses the first 72 bytes of a password, so longer ones are rejected.
  PASSWORD_MAX_BYTES: 72,
});

const asText = (value) => (typeof value === 'string' ? value : '');

function checkName(rawName) {
  const name = asText(rawName).trim();
  if (!name) return { name, error: 'Please enter your name.' };
  if (name.length < LIMITS.NAME_MIN) return { name, error: 'Name must be at least 2 characters.' };
  if (name.length > LIMITS.NAME_MAX) return { name, error: 'Name must be 50 characters or fewer.' };
  return { name, error: '' };
}

function checkEmail(rawEmail) {
  const email = asText(rawEmail).trim().toLowerCase();
  if (!email) return { email, error: 'Please enter your email address.' };
  if (email.length > LIMITS.EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    return { email, error: 'Enter a valid email address, e.g. exampleXXXX@chitkara.edu.in.' };
  }
  return { email, error: '' };
}

function checkNewPassword(rawPassword) {
  const password = asText(rawPassword);
  if (!password) return { password, error: 'Please create a password.' };
  if (password.length < LIMITS.PASSWORD_MIN) {
    return { password, error: 'Password must be at least 8 characters.' };
  }
  if (Buffer.byteLength(password, 'utf8') > LIMITS.PASSWORD_MAX_BYTES) {
    return { password, error: 'Password must be 72 bytes or fewer.' };
  }
  return { password, error: '' };
}

function collectErrors(checks) {
  const errors = {};
  for (const [field, message] of Object.entries(checks)) {
    if (message) errors[field] = message;
  }
  return Object.keys(errors).length > 0 ? errors : null;
}

/** Validates and normalises a signup body: { name, email, password }. */
export function validateSignup(body = {}) {
  const { name, error: nameError } = checkName(body.name);
  const { email, error: emailError } = checkEmail(body.email);
  const { password, error: passwordError } = checkNewPassword(body.password);

  return {
    values: { name, email, password },
    errors: collectErrors({ name: nameError, email: emailError, password: passwordError }),
  };
}

/** Validates and normalises a login body: { email, password }. */
export function validateLogin(body = {}) {
  const { email, error: emailError } = checkEmail(body.email);
  const password = asText(body.password);
  const passwordError = password ? '' : 'Please enter your password.';

  return {
    values: { email, password },
    errors: collectErrors({ email: emailError, password: passwordError }),
  };
}
