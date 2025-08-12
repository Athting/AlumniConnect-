import Chat from '../models/Chat.js';
import Connection from '../models/Connection.js';
import User from '../models/User.js';

// @desc    Get user's chats
// @route   GET /api/chats
// @access  Private
export const getChats = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const chats = await Chat.find({
      participants: req.user.id,
      isActive: true,
    })
      .populate('participants', 'fullName avatar role company batch branch')
      .populate('lastMessage.sender', 'fullName avatar')
      .sort({ 'lastMessage.timestamp': -1 })
      .limit(limit)
      .skip(startIndex);

    // Add unread count for each chat
    const chatsWithUnreadCount = chats.map(chat => {
      const chatObj = chat.toObject();
      chatObj.unreadCount = chat.getUnreadCount(req.user.id);
      return chatObj;
    });

    const total = await Chat.countDocuments({
      participants: req.user.id,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: chats.length,
      total,
      data: chatsWithUnreadCount,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single chat with messages
// @route   GET /api/chats/:id
// @access  Private
export const getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants', 'fullName avatar role company batch branch')
      .populate('messages.sender', 'fullName avatar role')
      .populate('messages.readBy.user', 'fullName avatar');

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    if (!chat.participants.some(participant => participant._id.toString() === req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this chat',
      });
    }

    // Mark messages as read
    await chat.markAsRead(req.user.id);

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or get direct chat
// @route   POST /api/chats/direct
// @access  Private
export const createDirectChat = async (req, res, next) => {
  try {
    const { participantId } = req.body;

    // Check if participant exists
    const participant = await User.findById(participantId);
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if users are connected
    const connection = await Connection.findOne({
      $or: [
        { requester: req.user.id, recipient: participantId, status: 'accepted' },
        { requester: participantId, recipient: req.user.id, status: 'accepted' },
      ],
    });

    if (!connection) {
      return res.status(403).json({
        success: false,
        message: 'You can only chat with connected alumni',
      });
    }

    // Find or create direct chat
    const chat = await Chat.findOrCreateDirectChat(req.user.id, participantId);

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message
// @route   POST /api/chats/:id/messages
// @access  Private
export const sendMessage = async (req, res, next) => {
  try {
    const { content, messageType = 'text', fileData = {} } = req.body;

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send messages in this chat',
      });
    }

    await chat.addMessage(req.user.id, content, messageType, fileData);

    const updatedChat = await Chat.findById(req.params.id)
      .populate('messages.sender', 'fullName avatar role')
      .populate('participants', 'fullName avatar');

    const newMessage = updatedChat.messages[updatedChat.messages.length - 1];

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark messages as read
// @route   PUT /api/chats/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const { messageIds = [] } = req.body;

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this chat',
      });
    }

    await chat.markAsRead(req.user.id, messageIds);

    res.status(200).json({
      success: true,
      message: 'Messages marked as read',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete chat
// @route   DELETE /api/chats/:id
// @access  Private
export const deleteChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this chat',
      });
    }

    // For direct chats, just mark as inactive for the user
    // For group chats, remove user from participants
    if (chat.chatType === 'direct') {
      chat.isActive = false;
    } else {
      chat.participants = chat.participants.filter(
        participant => participant.toString() !== req.user.id
      );
      
      if (chat.participants.length === 0) {
        chat.isActive = false;
      }
    }

    await chat.save();

    res.status(200).json({
      success: true,
      message: 'Chat deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat statistics
// @route   GET /api/chats/stats
// @access  Private
export const getChatStats = async (req, res, next) => {
  try {
    const [totalChats, unreadChats, totalMessages] = await Promise.all([
      Chat.countDocuments({
        participants: req.user.id,
        isActive: true,
      }),
      Chat.find({
        participants: req.user.id,
        isActive: true,
      }).then(chats => {
        return chats.filter(chat => chat.getUnreadCount(req.user.id) > 0).length;
      }),
      Chat.aggregate([
        { $match: { participants: req.user.id, isActive: true } },
        { $project: { messageCount: { $size: '$messages' } } },
        { $group: { _id: null, total: { $sum: '$messageCount' } } },
      ]).then(result => result[0]?.total || 0),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalChats,
        unreadChats,
        totalMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};