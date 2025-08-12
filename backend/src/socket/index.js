import { Server } from 'socket.io';
import { authenticateSocket, handleConnection } from './socketHandlers.js';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authentication middleware
  io.use(authenticateSocket);

  // Handle connections
  io.on('connection', handleConnection(io));

  // Handle server errors
  io.on('error', (error) => {
    console.error('Socket.IO server error:', error);
  });

  console.log('Socket.IO server initialized');
  
  return io;
};