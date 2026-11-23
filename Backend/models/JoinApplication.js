import mongoose from 'mongoose';
import { EMAIL_PATTERN } from '../utils/validation.js';

/**
 * A membership application from the Join Us form.
 * Field names match the frontend form (Frontend/src/pages/Join.jsx).
 */

export const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];

export const INTEREST_OPTIONS = [
  'Web Development',
  'Mobile Apps',
  'AI & Machine Learning',
  'Cloud & DevOps',
  'Competitive Programming',
  'Cybersecurity',
  'UI/UX Design',
  'Open Source',
];

export const EXPERIENCE_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

export const APPLICATION_STATUSES = ['pending', 'reviewed', 'accepted', 'rejected'];

// An email can't submit a new application while one of these is open.
export const OPEN_STATUSES = ['pending', 'reviewed'];

const joinApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: EMAIL_PATTERN,
      index: true,
    },
    year: { type: String, enum: YEAR_OPTIONS, required: true },
    branch: { type: String, required: true, trim: true, maxlength: 100 },
    interests: {
      type: [{ type: String, enum: INTEREST_OPTIONS }],
      default: [],
    },
    experience: { type: String, enum: EXPERIENCE_OPTIONS, required: true },
    github: { type: String, trim: true, maxlength: 200, default: '' },
    reason: { type: String, trim: true, maxlength: 1000, default: '' },
    status: { type: String, enum: APPLICATION_STATUSES, default: 'pending', index: true },
  },
  { timestamps: true }
);

joinApplicationSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    fullName: this.fullName,
    email: this.email,
    year: this.year,
    branch: this.branch,
    interests: this.interests,
    experience: this.experience,
    github: this.github,
    reason: this.reason,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const JoinApplication =
  mongoose.models.JoinApplication || mongoose.model('JoinApplication', joinApplicationSchema);

export default JoinApplication;
