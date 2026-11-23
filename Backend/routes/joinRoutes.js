import { Router } from 'express';
import {
  submitApplication,
  listApplications,
  updateApplicationStatus,
} from '../controllers/joinController.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = Router();

// Anyone can apply.
router.post('/', submitApplication);

// Only admins can see and manage applications.
router.get('/', requireAuth, requireRole('admin'), listApplications);
router.patch('/:id/status', requireAuth, requireRole('admin'), updateApplicationStatus);

export default router;
