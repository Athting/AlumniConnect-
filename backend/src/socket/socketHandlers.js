import Chat from '../models/Chat.js';
import Connection from '../models/Connection.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Socket authentication middleware
export const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return next(new Error('Authentication error: Invalid user'));
    }

    socket.userId = user._id.toString();
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token'));
  }
};

// Handle socket connection
export const handleConnection = (io) => {
  return async (socket) => {
    console.log(`User ${socket.user.fullName} connected: ${socket.id}`);

    // Join user to their personal room
    socket.join(`user_${socket.userId}`);

    // Join user to all their chat rooms
    try {
      const userChats = await Chat.find({
        participants: socket.userId,
        isActive: true,
      }).select('_id');

      userChats.forEach(chat => {
        socket.join(`chat_${chat._id}`);
      });
    } catch (error) {
      console.error('Error joining chat rooms:', error);
    }

    // Handle joining a specific chat
    socket.on('join_chat', async (data) => {
      try {
        const { chatId } = data;
        
        const chat = await Chat.findById(chatId);
        if (!chat || !chat.participants.includes(socket.userId)) {
          socket.emit('error', { message: 'Not authorized to join this chat' });
          return;
        }

        socket.join(`chat_${chatId}`);
        socket.emit('joined_chat', { chatId });
      } catch (error) {
        socket.emit('error', { message: 'Error joining chat' });
      }
    });

    // Handle leaving a chat
    socket.on('leave_chat', (data) => {
      const { chatId } = data;
      socket.leave(`chat_${chatId}`);
      socket.emit('left_chat', { chatId });
    });

    // Handle sending a message
    socket.on('send_message', async (data) => {
      try {
        const { chatId, content, messageType = 'text', fileData = {} } = data;

        const chat = await Chat.findById(chatId);
        if (!chat || !chat.participants.includes(socket.userId)) {
          socket.emit('error', { message: 'Not authorized to send message' });
          return;
        }

        await chat.addMessage(socket.userId, content, messageType, fileData);

        const updatedChat = await Chat.findById(chatId)
          .populate('messages.sender', 'fullName avatar role')
          .populate('participants', 'fullName avatar');

        const newMessage = updatedChat.messages[updatedChat.messages.length - 1];

        // Emit to all participants in the chat
        io.to(`chat_${chatId}`).emit('new_message', {
          chatId,
          message: newMessage,
          lastMessage: updatedChat.lastMessage,
        });

        // Send push notification to offline users (if implemented)
        const offlineParticipants = chat.participants.filter(
          participantId => participantId.toString() !== socket.userId
        );

        // You can implement push notifications here
        // notifyOfflineUsers(offlineParticipants, newMessage);

      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Error sending message' });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { chatId } = data;
      socket.to(`chat_${chatId}`).emit('user_typing', {
        chatId,
        userId: socket.userId,
        userName: socket.user.fullName,
      });
    });

    socket.on('typing_stop', (data) => {
      const { chatId } = data;
      socket.to(`chat_${chatId}`).emit('user_stopped_typing', {
        chatId,
        userId: socket.userId,
      });
    });

    // Handle marking messages as read
    socket.on('mark_as_read', async (data) => {
      try {
        const { chatId, messageIds = [] } = data;

        const chat = await Chat.findById(chatId);
        if (!chat || !chat.participants.includes(socket.userId)) {
          socket.emit('error', { message: 'Not authorized to access this chat' });
          return;
        }

        await chat.markAsRead(socket.userId, messageIds);

        // Notify other participants that messages were read
        socket.to(`chat_${chatId}`).emit('messages_read', {
          chatId,
          userId: socket.userId,
          userName: socket.user.fullName,
          messageIds,
        });

      } catch (error) {
        console.error('Error marking messages as read:', error);
        socket.emit('error', { message: 'Error marking messages as read' });
      }
    });

    // Handle creating direct chat
    socket.on('create_direct_chat', async (data) => {
      try {
        const { participantId } = data;

        // Check if users are connected
        const connection = await Connection.findOne({
          $or: [
            { requester: socket.userId, recipient: participantId, status: 'accepted' },
            { requester: participantId, recipient: socket.userId, status: 'accepted' },
          ],
        });

        if (!connection) {
          socket.emit('error', { message: 'You can only chat with connected alumni' });
          return;
        }

        const chat = await Chat.findOrCreateDirectChat(socket.userId, participantId);

        // Join both users to the chat room
        socket.join(`chat_${chat._id}`);
        
        // Notify the other user if they're online
        socket.to(`user_${participantId}`).emit('new_chat_created', {
          chat: chat,
        });

        socket.emit('chat_created', { chat });

      } catch (error) {
        console.error('Error creating direct chat:', error);
        socket.emit('error', { message: 'Error creating chat' });
      }
    });

    // Handle user status updates
    socket.on('update_status', (data) => {
      const { status } = data; // online, away, busy, offline
      socket.broadcast.emit('user_status_changed', {
        userId: socket.userId,
        status,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.fullName} disconnected: ${socket.id}`);
      
      // Notify other users that this user went offline
      socket.broadcast.emit('user_status_changed', {
        userId: socket.userId,
        status: 'offline',
      });
    });

    // Handle connection errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  };
};

// Utility function to get online users in a chat
export const getOnlineUsersInChat = (io, chatId) => {
  const room = io.sockets.adapter.rooms.get(`chat_${chatId}`);
  if (!room) return [];

  const onlineUsers = [];
  for (const socketId of room) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && socket.userId) {
      onlineUsers.push({
        userId: socket.userId,
        userName: socket.user.fullName,
        avatar: socket.user.avatar,
      });
    }
  }

  return onlineUsers;
};

// Utility function to notify offline users (placeholder for push notifications)
export const notifyOfflineUsers = async (userIds, message) => {
  // Implement push notification logic here
  // This could integrate with services like Firebase, Pusher, or custom notification service
  console.log('Notifying offline users:', userIds, 'Message:', message.content);
};