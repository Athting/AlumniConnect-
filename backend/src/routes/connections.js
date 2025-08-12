import express from 'express';
import {
  sendConnectionRequest,
  getConnectionRequests,
  getSentRequests,
  acceptConnection,
  rejectConnection,
  getConnections,
  removeConnection,
  getConnectionStatus,
  getConnectionStats,
} from '../controllers/connectionController.js';
import { protect } from '../middleware/auth.js';
import { body, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Validation for connection request
const validateConnectionRequest = [
  body('recipientId')
    .isMongoId()
    .withMessage('Invalid recipient ID'),
  body('message')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
  body('connectionType')
    .optional()
    .isIn(['professional', 'mentorship', 'collaboration', 'friendship'])
    .withMessage('Invalid connection type'),
];

router.get('/stats', protect, getConnectionStats);
router.get('/requests', protect, getConnectionRequests);
router.get('/sent', protect, getSentRequests);
router.get('/status/:userId', protect, getConnectionStatus);
router.get('/', protect, getConnections);
router.post('/request', protect, validateConnectionRequest, handleValidationErrors, sendConnectionRequest);
router.put('/:id/accept', protect, acceptConnection);
router.put('/:id/reject', protect, rejectConnection);
router.delete('/:id', protect, removeConnection);

export default router;