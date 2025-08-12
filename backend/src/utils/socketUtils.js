import { io } from '../server.js';

// Utility functions for Socket.IO operations

// Send notification to specific user
export const sendNotificationToUser = (userId, notification) => {
  io.to(`user_${userId}`).emit('notification', notification);
};

// Send message to chat room
export const sendMessageToChat = (chatId, event, data) => {
  io.to(`chat_${chatId}`).emit(event, data);
};

// Get online users count
export const getOnlineUsersCount = () => {
  return io.sockets.sockets.size;
};

// Get users in a specific room
export const getUsersInRoom = (roomName) => {
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.size : 0;
};

// Broadcast to all connected users
export const broadcastToAll = (event, data) => {
  io.emit(event, data);
};

// Send typing indicator to chat
export const sendTypingIndicator = (chatId, userId, userName, isTyping) => {
  const event = isTyping ? 'user_typing' : 'user_stopped_typing';
  io.to(`chat_${chatId}`).emit(event, {
    chatId,
    userId,
    userName,
  });
};

// Notify users about connection status changes
export const notifyConnectionStatusChange = (userId, status) => {
  io.emit('user_status_changed', {
    userId,
    status,
  });
};

// Send real-time updates for new connections
export const notifyNewConnection = (userId, connectionData) => {
  sendNotificationToUser(userId, {
    type: 'new_connection',
    title: 'New Connection Request',
    message: `${connectionData.requester.fullName} wants to connect with you`,
    data: connectionData,
  });
};

// Send real-time updates for accepted connections
export const notifyConnectionAccepted = (userId, connectionData) => {
  sendNotificationToUser(userId, {
    type: 'connection_accepted',
    title: 'Connection Accepted',
    message: `${connectionData.recipient.fullName} accepted your connection request`,
    data: connectionData,
  });
};