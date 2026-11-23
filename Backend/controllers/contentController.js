import mongoose from 'mongoose';
import Event from '../models/Event.js';
import Project from '../models/Project.js';
import TeamMember from '../models/TeamMember.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/** Shared "get one by id" handler for read-only collections. */
const getOne = (Model, key, label) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, `Invalid ${label} id.`);

    const item = await Model.findById(id);
    if (!item) throw new ApiError(404, `${label[0].toUpperCase()}${label.slice(1)} not found.`);

    res.json({ [key]: item.toPublic() });
  });

/** GET /api/events (newest first) */
export const listEvents = asyncHandler(async (_req, res) => {
  const events = await Event.find().sort({ startDate: -1, title: 1 });
  res.json({ count: events.length, events: events.map((event) => event.toPublic()) });
});

/** GET /api/events/:id */
export const getEvent = getOne(Event, 'event', 'event');

/** GET /api/projects (real projects first, then by title) */
export const listProjects = asyncHandler(async (_req, res) => {
  const projects = await Project.find().sort({ isSample: 1, createdAt: 1 });
  res.json({ count: projects.length, projects: projects.map((project) => project.toPublic()) });
});

/** GET /api/projects/:id */
export const getProject = getOne(Project, 'project', 'project');

/**
 * GET /api/team
 * Returns the members grouped for the Team page, plus `count`, which is
 * always the real number of members in the database.
 */
export const getTeam = asyncHandler(async (_req, res) => {
  const members = await TeamMember.find().sort({ order: 1, name: 1 });

  const leads = members.filter((member) => member.group === 'leads').map((m) => m.toPublic());
  const core = members.filter((member) => member.group === 'core').map((m) => m.toPublic());

  res.json({ count: members.length, leads, core });
});
