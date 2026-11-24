import mongoose from 'mongoose';

/**
 * A member of the club's team, shown on the Team page.
 *
 * - `group` decides the section: "leads" (Leadership) or "core" (Core Team).
 * - `order` sets the position within a group (lower first).
 * - bio, links and avatar are optional and only shown when present.
 * - rollNumber, department and email are optional member details shown on
 *   the Team page cards.
 */

export const TEAM_GROUPS = ['leads', 'core'];

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80, unique: true },
    role: { type: String, required: true, trim: true, maxlength: 60 },
    group: { type: String, enum: TEAM_GROUPS, required: true },
    order: { type: Number, default: 0 },
    bio: { type: String, trim: true, maxlength: 300, default: '' },
    github: { type: String, trim: true, maxlength: 300, default: '' },
    linkedin: { type: String, trim: true, maxlength: 300, default: '' },
    twitter: { type: String, trim: true, maxlength: 300, default: '' },
    avatar: { type: String, trim: true, maxlength: 300, default: '' },
    rollNumber: { type: String, trim: true, maxlength: 20, match: /^\d*$/, default: '' },
    department: { type: String, trim: true, maxlength: 60, default: '' },
    email: { type: String, trim: true, lowercase: true, maxlength: 254, match: /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, default: '' },
  },
  { timestamps: true }
);

teamMemberSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    name: this.name,
    role: this.role,
    bio: this.bio || null,
    github: this.github || null,
    linkedin: this.linkedin || null,
    twitter: this.twitter || null,
    avatar: this.avatar || null,
    rollNumber: this.rollNumber || null,
    department: this.department || null,
    email: this.email || null,
  };
};

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
