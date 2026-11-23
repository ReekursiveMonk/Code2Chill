import mongoose from 'mongoose';

/**
 * A student project. Field names match the frontend Projects page.
 *
 * - `github` / `live` are full URLs, or empty when there is no link.
 * - `stars`, `forks`, `contributors` are optional: leave them empty unless
 *   the numbers are real.
 * - `isSample` marks placeholder content that is not a real club project.
 */

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120, unique: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    tech: { type: [String], default: [] },
    category: { type: String, required: true, trim: true, maxlength: 40 },
    github: { type: String, trim: true, maxlength: 300, default: '' },
    live: { type: String, trim: true, maxlength: 300, default: '' },
    stars: { type: Number, min: 0, default: undefined },
    forks: { type: Number, min: 0, default: undefined },
    contributors: { type: Number, min: 0, default: undefined },
    isSample: { type: Boolean, default: false },
  },
  { timestamps: true }
);

projectSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    title: this.title,
    description: this.description,
    tech: this.tech,
    category: this.category,
    github: this.github || null,
    live: this.live || null,
    stars: this.stars ?? null,
    forks: this.forks ?? null,
    contributors: this.contributors ?? null,
    isSample: this.isSample,
  };
};

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
