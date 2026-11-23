import mongoose from 'mongoose';
import JoinApplication, { APPLICATION_STATUSES, OPEN_STATUSES } from '../models/JoinApplication.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validateJoinApplication, validateStatus } from '../utils/joinValidation.js';

const OPEN_MESSAGE = 'An application with this email is already being reviewed.';
const duplicateOpenApplication = () => new ApiError(409, OPEN_MESSAGE, { email: OPEN_MESSAGE });

/**
 * POST /api/join  (public)
 * Body: { fullName, email, year, branch, interests, experience, github, reason }
 */
export const submitApplication = asyncHandler(async (req, res) => {
  const { values, errors } = validateJoinApplication(req.body);
  if (errors) throw new ApiError(400, 'Please fix the highlighted fields.', errors);

  // One open application per email address (also enforced by a unique index).
  const open = await JoinApplication.exists({ email: values.email, isOpen: true });
  if (open) throw duplicateOpenApplication();

  let application;
  try {
    application = await JoinApplication.create(values);
  } catch (error) {
    // Two submissions at the same moment: the unique index rejects the second.
    if (error?.code === 11000) throw duplicateOpenApplication();
    throw error;
  }

  res.status(201).json({
    message: 'Application submitted.',
    application: {
      id: String(application._id),
      status: application.status,
      createdAt: application.createdAt,
    },
  });
});

/**
 * GET /api/join  (admin)
 * Optional query: ?status=pending|reviewed|accepted|rejected
 */
export const listApplications = asyncHandler(async (req, res) => {
  const filter = {};
  const { status } = req.query;

  if (status !== undefined) {
    if (!APPLICATION_STATUSES.includes(status)) {
      throw new ApiError(400, `Status filter must be one of: ${APPLICATION_STATUSES.join(', ')}.`);
    }
    filter.status = status;
  }

  const applications = await JoinApplication.find(filter).sort({ createdAt: -1 });
  res.json({
    count: applications.length,
    applications: applications.map((application) => application.toPublic()),
  });
});

/**
 * PATCH /api/join/:id/status  (admin)
 * Body: { status }
 */
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, 'Invalid application id.');

  const { status, error } = validateStatus(req.body);
  if (error) throw new ApiError(400, error, { status: error });

  let application;
  try {
    application = await JoinApplication.findByIdAndUpdate(
      id,
      { status, isOpen: OPEN_STATUSES.includes(status) },
      { new: true, runValidators: true }
    );
  } catch (error) {
    // Re-opening an application when the same email already has an open one.
    if (error?.code === 11000) {
      throw new ApiError(409, 'This email already has another open application.');
    }
    throw error;
  }
  if (!application) throw new ApiError(404, 'Application not found.');

  res.json({ message: 'Status updated.', application: application.toPublic() });
});
