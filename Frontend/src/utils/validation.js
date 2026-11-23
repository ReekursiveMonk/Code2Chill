// Basic format check only. Any email domain is accepted; the Chitkara address
// shown in the forms is just a placeholder example.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name) {
  const value = name.trim();
  if (!value) return 'Please enter your name.';
  if (value.length < 2) return 'Name must be at least 2 characters.';
  return '';
}

export function validateEmail(email) {
  const value = email.trim();
  if (!value) return 'Please enter your email address.';
  if (!EMAIL_PATTERN.test(value)) {
    return 'Enter a valid email address, e.g. exampleXXXX@chitkara.edu.in.';
  }
  return '';
}

export function validateNewPassword(password) {
  if (!password) return 'Please create a password.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
