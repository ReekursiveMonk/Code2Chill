import mongoose from 'mongoose';
import JoinApplication, { APPLICATION_STATUSES, OPEN_STATUSES } from '../models/JoinApplication.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validateJoinApplication, validateStatus } from '../utils/joinValidation.js';

/**
 * POST /api/join  (public)
 * Body: { fullName, email, year, branch, interests, experience, github, reason }
 */
export const submitApplication = asyncHandler(async (req, res) => {
  const { values, errors } = validateJoinApplication(req.body);
  if (errors) throw new ApiError(400, 'Please fix the highlighted fields.', errors);

  // One open application per email address.
  const open = await JoinApplication.exists({
    email: values.email,
    status: { $in: OPEN_STATUSES },
  });
  if (open) {
    throw new ApiError(409, 'An application with this email is already being reviewed.', {
      email: 'An application with this email is already being reviewed.',
    });
  }

  const application = await JoinApplication.create(values);

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

  const application = await JoinApplication.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  if (!application) throw new ApiError(404, 'Application not found.');

  res.json({ message: 'Status updated.', application: application.toPublic() });
});
