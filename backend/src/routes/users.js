import express from 'express';
import {
  getUsers,
  getUser,
  getUserProfile,
  getUserBlogs,
  getUserQuestions,
  getAlumni,
  updateAvatar,
} from '../controllers/userController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getUsers);
router.get('/alumni', optionalAuth, getAlumni);
router.get('/:id', optionalAuth, getUser);
router.get('/:id/profile', optionalAuth, getUserProfile);
router.get('/:id/blogs', getUserBlogs);
router.get('/:id/questions', getUserQuestions);
router.put('/avatar', protect, updateAvatar);

export default router;