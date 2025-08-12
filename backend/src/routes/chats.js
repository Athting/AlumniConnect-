import express from 'express';
import {
  getChats,
  getChat,
  createDirectChat,
  sendMessage,
  markAsRead,
  deleteChat,
  getChatStats,
} from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';
import { body, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Validation for creating direct chat
const validateDirectChat = [
  body('participantId')
    .isMongoId()
    .withMessage('Invalid participant ID'),
];

// Validation for sending message
const validateMessage = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message content must be between 1 and 1000 characters'),
  body('messageType')
    .optional()
    .isIn(['text', 'image', 'file'])
    .withMessage('Invalid message type'),
];

// All routes require authentication
router.use(protect);

router.get('/stats', getChatStats);
router.get('/', getChats);
router.get('/:id', getChat);
router.post('/direct', validateDirectChat, handleValidationErrors, createDirectChat);
router.post('/:id/messages', validateMessage, handleValidationErrors, sendMessage);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteChat);

export default router;