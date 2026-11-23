import { Router } from 'express';
import {
  listEvents,
  getEvent,
  listProjects,
  getProject,
  getTeam,
} from '../controllers/contentController.js';

/** Public, read-only club content. */
const router = Router();

router.get('/events', listEvents);
router.get('/events/:id', getEvent);
router.get('/projects', listProjects);
router.get('/projects/:id', getProject);
router.get('/team', getTeam);

export default router;
