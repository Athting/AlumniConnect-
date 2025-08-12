import express from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  addComment,
  getFeaturedBlogs,
  getTrendingBlogs,
  getMyBlogs,
} from '../controllers/blogController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { 
  validateBlog, 
  validateComment, 
  handleValidationErrors 
} from '../middleware/validation.js';

const router = express.Router();

router.get('/featured', getFeaturedBlogs);
router.get('/trending', getTrendingBlogs);
router.get('/my', protect, getMyBlogs);
router.get('/', optionalAuth, getBlogs);
router.get('/:id', optionalAuth, getBlog);
router.post('/', protect, validateBlog, handleValidationErrors, createBlog);
router.put('/:id', protect, validateBlog, handleValidationErrors, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.put('/:id/like', protect, toggleLikeBlog);
router.post('/:id/comments', protect, validateComment, handleValidationErrors, addComment);

export default router;