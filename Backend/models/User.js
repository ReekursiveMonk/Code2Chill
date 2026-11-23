import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { EMAIL_PATTERN, LIMITS } from '../utils/validation.js';

export const SALT_ROUNDS = 12;
export const ROLES = ['member', 'admin'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name.'],
      trim: true,
      minlength: [LIMITS.NAME_MIN, 'Name must be at least 2 characters.'],
      maxlength: [LIMITS.NAME_MAX, 'Name must be 50 characters or fewer.'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address.'],
      unique: true, // creates a unique index in MongoDB
      lowercase: true,
      trim: true,
      maxlength: LIMITS.EMAIL_MAX,
      match: [EMAIL_PATTERN, 'Enter a valid email address.'],
    },
    // Always stored as a bcrypt hash, never plain text.
    // `select: false` keeps it out of query results unless explicitly requested.
    password: {
      type: String,
      required: [true, 'Please create a password.'],
      select: false,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'member',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    toJSON: {
      // Safety net: even if a user document is sent as-is, the password
      // and internal fields are removed.
      transform(_doc, ret) {
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

// Hash the password whenever it is new or has changed.
userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// The only user fields the API ever returns.
userSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    name: this.name,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt,
  };
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
