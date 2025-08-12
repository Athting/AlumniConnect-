import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text',
  },
  fileUrl: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
  }],
  editedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  chatType: {
    type: String,
    enum: ['direct', 'group'],
    default: 'direct',
  },
  chatName: {
    type: String,
    trim: true,
  },
  chatDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  chatAvatar: {
    type: String,
    default: '',
  },
  messages: [messageSchema],
  lastMessage: {
    content: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Indexes for better query performance
chatSchema.index({ participants: 1 });
chatSchema.index({ 'lastMessage.timestamp': -1 });
chatSchema.index({ createdAt: -1 });
chatSchema.index({ 'messages.sender': 1 });
chatSchema.index({ 'messages.createdAt': -1 });

// Virtual for unread message count
chatSchema.virtual('unreadCount').get(function() {
  // This will be calculated in the controller based on user
  return 0;
});

// Method to add a message
chatSchema.methods.addMessage = function(senderId, content, messageType = 'text', fileData = {}) {
  const message = {
    sender: senderId,
    content,
    messageType,
    fileUrl: fileData.fileUrl || '',
    fileName: fileData.fileName || '',
  };

  this.messages.push(message);
  this.lastMessage = {
    content: messageType === 'text' ? content : `Sent a ${messageType}`,
    sender: senderId,
    timestamp: new Date(),
  };

  return this.save();
};

// Method to mark messages as read
chatSchema.methods.markAsRead = function(userId, messageIds = []) {
  if (messageIds.length === 0) {
    // Mark all messages as read
    this.messages.forEach(message => {
      if (message.sender.toString() !== userId.toString()) {
        const existingRead = message.readBy.find(read => read.user.toString() === userId.toString());
        if (!existingRead) {
          message.readBy.push({ user: userId });
        }
      }
    });
  } else {
    // Mark specific messages as read
    messageIds.forEach(messageId => {
      const message = this.messages.id(messageId);
      if (message && message.sender.toString() !== userId.toString()) {
        const existingRead = message.readBy.find(read => read.user.toString() === userId.toString());
        if (!existingRead) {
          message.readBy.push({ user: userId });
        }
      }
    });
  }

  return this.save();
};

// Method to get unread message count for a user
chatSchema.methods.getUnreadCount = function(userId) {
  return this.messages.filter(message => {
    if (message.sender.toString() === userId.toString()) return false;
    return !message.readBy.some(read => read.user.toString() === userId.toString());
  }).length;
};

// Static method to find or create direct chat
chatSchema.statics.findOrCreateDirectChat = async function(user1Id, user2Id) {
  let chat = await this.findOne({
    chatType: 'direct',
    participants: { $all: [user1Id, user2Id], $size: 2 }
  }).populate('participants', 'fullName avatar role company batch branch');

  if (!chat) {
    chat = await this.create({
      participants: [user1Id, user2Id],
      chatType: 'direct',
      createdBy: user1Id,
    });
    
    chat = await this.findById(chat._id)
      .populate('participants', 'fullName avatar role company batch branch');
  }

  return chat;
};

export default mongoose.model('Chat', chatSchema);