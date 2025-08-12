# AlumniConnect Backend API
A comprehensive backend API for the AlumniConnect platform, built with Node.js, Express, and MongoDB.

### Real-time Chat System
- **Socket.IO Integration**: Real-time messaging between connected alumni
- **Direct Messaging**: One-on-one conversations between connected users
- **Message Types**: Support for text, image, and file messages
- **Read Receipts**: Track message read status
- **Typing Indicators**: Real-time typing status
- **Online Status**: Track user online/offline status
- **Message Persistence**: All messages stored in MongoDB
- **Connection Validation**: Only connected alumni can chat with each other
## Features
### Chat Features
- Create direct chats with connected alumni
- Send and receive messages in real-time
- Mark messages as read/unread
- Get chat statistics and unread counts
- File and image sharing support
- Message history and pagination
- User presence indicators
- Push notification support (extensible)
## Socket.IO Events
### Client to Server Events
- `join_chat`: Join a specific chat room
- `leave_chat`: Leave a chat room
- `send_message`: Send a message to a chat
- `typing_start`: Indicate user started typing
- `typing_stop`: Indicate user stopped typing
- `mark_as_read`: Mark messages as read
- `create_direct_chat`: Create a new direct chat
- `update_status`: Update user online status
### Server to Client Events
- `new_message`: Receive a new message
- `user_typing`: User started typing indicator
- `user_stopped_typing`: User stopped typing indicator
- `messages_read`: Messages marked as read
- `user_status_changed`: User online status changed
- `new_chat_created`: New chat was created
- `notification`: General notifications
- `error`: Error messages
## API Endpoints
### Chat Endpoints
- `GET /api/chats` - Get user's chats
- `GET /api/chats/:id` - Get specific chat with messages
- `POST /api/chats/direct` - Create or get direct chat
- `POST /api/chats/:id/messages` - Send a message
- `PUT /api/chats/:id/read` - Mark messages as read
- `DELETE /api/chats/:id` - Delete/leave chat
- `GET /api/chats/stats` - Get chat statistics
## Environment Variables
Add these to your `.env` file:
```env
# Socket.IO Configuration
SOCKET_IO_CORS_ORIGIN=http://localhost:5173
SOCKET_IO_PING_TIMEOUT=60000
SOCKET_IO_PING_INTERVAL=25000
```
## Usage
### Starting the Server
```bash
npm run dev
```
The server will start with both HTTP and Socket.IO support on the configured port.
### Socket.IO Authentication
Clients must provide a JWT token in the socket handshake:
```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```
### Creating a Chat
Only users with accepted connections can create chats:
```javascript
socket.emit('create_direct_chat', {
  participantId: 'user-id-to-chat-with'
});
```
### Sending Messages
```javascript
socket.emit('send_message', {
  chatId: 'chat-id',
  content: 'Hello!',
  messageType: 'text'
});
```
## Database Schema
### Chat Model
- Supports both direct and group chats
- Stores messages with sender, content, and metadata
- Tracks read receipts for each message
- Maintains last message for chat previews
- Supports file attachments and different message types
### Message Schema
- Embedded in Chat documents
- Supports text, image, and file types
- Read receipts tracking
- Edit and delete functionality
- Timestamp and sender information