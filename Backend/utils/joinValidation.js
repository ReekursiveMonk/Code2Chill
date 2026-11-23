import { EMAIL_PATTERN } from './validation.js';
import {
  YEAR_OPTIONS,
  INTEREST_OPTIONS,
  EXPERIENCE_OPTIONS,
  APPLICATION_STATUSES,
} from '../models/JoinApplication.js';

/**
 * Validation for the Join Us form. Required fields match the frontend form:
 * full name, email and branch. Everything else is optional but must be valid.
 */

const asText = (value) => (typeof value === 'string' ? value.trim() : '');
const isHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export function validateJoinApplication(body = {}) {
  const errors = {};

  const fullName = asText(body.fullName);
  if (!fullName) errors.fullName = 'Please enter your full name.';
  else if (fullName.length < 2) errors.fullName = 'Name must be at least 2 characters.';
  else if (fullName.length > 80) errors.fullName = 'Name must be 80 characters or fewer.';

  const email = asText(body.email).toLowerCase();
  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address, e.g. exampleXXXX@chitkara.edu.in.';
  }

  const branch = asText(body.branch);
  if (!branch) errors.branch = 'Please enter your branch or major.';
  else if (branch.length > 100) errors.branch = 'Branch must be 100 characters or fewer.';

  const year = asText(body.year) || YEAR_OPTIONS[0];
  if (!YEAR_OPTIONS.includes(year)) errors.year = 'Please choose a valid year of study.';

  const experience = asText(body.experience) || EXPERIENCE_OPTIONS[0];
  if (!EXPERIENCE_OPTIONS.includes(experience)) {
    errors.experience = 'Please choose a valid experience level.';
  }

  let interests = [];
  if (body.interests !== undefined) {
    if (!Array.isArray(body.interests) || !body.interests.every((i) => INTEREST_OPTIONS.includes(i))) {
      errors.interests = 'Please choose interests from the list.';
    } else {
      interests = [...new Set(body.interests)];
    }
  }

  const github = asText(body.github);
  if (github && (github.length > 200 || !isHttpUrl(github))) {
    errors.github = 'Enter a full link starting with https://, or leave this empty.';
  }

  const reason = asText(body.reason);
  if (reason.length > 1000) errors.reason = 'Please keep this under 1000 characters.';

  return {
    values: { fullName, email, branch, year, experience, interests, github, reason },
    errors: Object.keys(errors).length > 0 ? errors : null,
  };
}

export function validateStatus(body = {}) {
  const status = asText(body.status);
  if (!APPLICATION_STATUSES.includes(status)) {
    return {
      status,
      error: `Status must be one of: ${APPLICATION_STATUSES.join(', ')}.`,
    };
  }
  return { status, error: '' };
}
