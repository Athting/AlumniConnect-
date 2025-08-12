import Connection from '../models/Connection.js';
import User from '../models/User.js';

// @desc    Send connection request
// @route   POST /api/connections/request
// @access  Private
export const sendConnectionRequest = async (req, res, next) => {
  try {
    const { recipientId, message, connectionType } = req.body;

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user is trying to connect to themselves
    if (req.user.id === recipientId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send connection request to yourself',
      });
    }

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { requester: req.user.id, recipient: recipientId },
        { requester: recipientId, recipient: req.user.id },
      ],
    });

    if (existingConnection) {
      return res.status(400).json({
        success: false,
        message: 'Connection request already exists',
      });
    }

    const connection = await Connection.create({
      requester: req.user.id,
      recipient: recipientId,
      message,
      connectionType: connectionType || 'professional',
    });

    const populatedConnection = await Connection.findById(connection._id)
      .populate('requester', 'fullName avatar role company batch branch')
      .populate('recipient', 'fullName avatar role company batch branch');

    res.status(201).json({
      success: true,
      data: populatedConnection,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get connection requests (received)
// @route   GET /api/connections/requests
// @access  Private
export const getConnectionRequests = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const requests = await Connection.find({
      recipient: req.user.id,
      status: 'pending',
    })
      .populate('requester', 'fullName avatar role company batch branch location bio')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Connection.countDocuments({
      recipient: req.user.id,
      status: 'pending',
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      total,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sent connection requests
// @route   GET /api/connections/sent
// @access  Private
export const getSentRequests = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const requests = await Connection.find({
      requester: req.user.id,
    })
      .populate('recipient', 'fullName avatar role company batch branch location bio')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Connection.countDocuments({
      requester: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      total,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept connection request
// @route   PUT /api/connections/:id/accept
// @access  Private
export const acceptConnection = async (req, res, next) => {
  try {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: 'Connection request not found',
      });
    }

    // Check if user is the recipient
    if (connection.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to accept this connection',
      });
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Connection request is not pending',
      });
    }

    await connection.accept();

    const populatedConnection = await Connection.findById(connection._id)
      .populate('requester', 'fullName avatar role company batch branch')
      .populate('recipient', 'fullName avatar role company batch branch');

    res.status(200).json({
      success: true,
      data: populatedConnection,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject connection request
// @route   PUT /api/connections/:id/reject
// @access  Private
export const rejectConnection = async (req, res, next) => {
  try {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: 'Connection request not found',
      });
    }

    // Check if user is the recipient
    if (connection.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to reject this connection',
      });
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Connection request is not pending',
      });
    }

    await connection.reject();

    res.status(200).json({
      success: true,
      message: 'Connection request rejected',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user connections
// @route   GET /api/connections
// @access  Private
export const getConnections = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const connections = await Connection.find({
      $or: [
        { requester: req.user.id, status: 'accepted' },
        { recipient: req.user.id, status: 'accepted' },
      ],
    })
      .populate('requester', 'fullName avatar role company batch branch location bio')
      .populate('recipient', 'fullName avatar role company batch branch location bio')
      .sort({ acceptedAt: -1 })
      .limit(limit)
      .skip(startIndex);

    // Transform connections to show the other user
    const transformedConnections = connections.map(connection => {
      const otherUser = connection.requester._id.toString() === req.user.id 
        ? connection.recipient 
        : connection.requester;
      
      return {
        _id: connection._id,
        user: otherUser,
        connectionType: connection.connectionType,
        connectedAt: connection.acceptedAt,
        message: connection.message,
      };
    });

    const total = await Connection.countDocuments({
      $or: [
        { requester: req.user.id, status: 'accepted' },
        { recipient: req.user.id, status: 'accepted' },
      ],
    });

    res.status(200).json({
      success: true,
      count: transformedConnections.length,
      total,
      data: transformedConnections,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove connection
// @route   DELETE /api/connections/:id
// @access  Private
export const removeConnection = async (req, res, next) => {
  try {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: 'Connection not found',
      });
    }

    // Check if user is part of this connection
    if (connection.requester.toString() !== req.user.id && 
        connection.recipient.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to remove this connection',
      });
    }

    await connection.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Connection removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get connection status with another user
// @route   GET /api/connections/status/:userId
// @access  Private
export const getConnectionStatus = async (req, res, next) => {
  try {
    const status = await Connection.getConnectionStatus(req.user.id, req.params.userId);

    res.status(200).json({
      success: true,
      data: { status },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get connection statistics
// @route   GET /api/connections/stats
// @access  Private
export const getConnectionStats = async (req, res, next) => {
  try {
    const [totalConnections, pendingRequests, sentRequests] = await Promise.all([
      Connection.countDocuments({
        $or: [
          { requester: req.user.id, status: 'accepted' },
          { recipient: req.user.id, status: 'accepted' },
        ],
      }),
      Connection.countDocuments({
        recipient: req.user.id,
        status: 'pending',
      }),
      Connection.countDocuments({
        requester: req.user.id,
        status: 'pending',
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalConnections,
        pendingRequests,
        sentRequests,
      },
    });
  } catch (error) {
    next(error);
  }
};