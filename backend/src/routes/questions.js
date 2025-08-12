import express from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  toggleUpvoteQuestion,
  toggleDownvoteQuestion,
  addAnswer,
  acceptAnswer,
  getTrendingQuestions,
  getMyQuestions,
} from '../controllers/questionController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { 
  validateQuestion, 
  validateAnswer, 
  handleValidationErrors 
} from '../middleware/validation.js';

const router = express.Router();

router.get('/trending', getTrendingQuestions);
router.get('/my', protect, getMyQuestions);
router.get('/', optionalAuth, getQuestions);
router.get('/:id', optionalAuth, getQuestion);
router.post('/', protect, validateQuestion, handleValidationErrors, createQuestion);
router.put('/:id', protect, validateQuestion, handleValidationErrors, updateQuestion);
router.delete('/:id', protect, deleteQuestion);
router.put('/:id/upvote', protect, toggleUpvoteQuestion);
router.put('/:id/downvote', protect, toggleDownvoteQuestion);
router.post('/:id/answers', protect, validateAnswer, handleValidationErrors, addAnswer);
router.put('/:id/answers/:answerId/accept', protect, acceptAnswer);

export default router;