import mongoose from 'mongoose';

/**
 * A club event. Field names match what the frontend Events page uses.
 *
 * - `date` and `time` are display text, e.g. "Dec 15, 2025" and "2:00 PM – 5:00 PM".
 * - `startDate` / `endDate` are "YYYY-MM-DD" strings. The frontend uses them to
 *   decide whether an event is upcoming or past (stored as plain strings to
 *   avoid time-zone shifts).
 * - `isSample` marks placeholder content that is not a real club event.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120, unique: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    date: { type: String, required: true, trim: true, maxlength: 60 },
    time: { type: String, trim: true, maxlength: 60, default: '' },
    location: { type: String, trim: true, maxlength: 120, default: '' },
    category: { type: String, required: true, trim: true, maxlength: 40 },
    startDate: { type: String, required: true, match: ISO_DATE },
    endDate: { type: String, match: ISO_DATE, default: undefined },
    attendees: { type: Number, min: 0, default: undefined },
    isSample: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    title: this.title,
    description: this.description,
    date: this.date,
    time: this.time,
    location: this.location,
    category: this.category,
    startDate: this.startDate,
    endDate: this.endDate ?? null,
    attendees: this.attendees ?? null,
    isSample: this.isSample,
  };
};

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
