# AlumniConnect Backend API

A comprehensive backend API for the AlumniConnect platform, built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user profiles with alumni/student roles
- **Blog System**: Create, read, update, delete blogs with comments and likes
- **Q&A Forum**: Question and answer system with voting and accepted answers
- **Alumni Network**: Connection system for networking between users
- **File Upload**: Image upload with Cloudinary integration
- **Email Notifications**: Automated email notifications for various events
- **Search & Filtering**: Advanced search and filtering capabilities
- **Rate Limiting**: API rate limiting for security
- **Data Validation**: Comprehensive input validation and sanitization

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Documentation**: Swagger/OpenAPI

## Project Structure

```
backend/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── blogController.js
│   │   ├── questionController.js
│   │   └── connectionController.js
│   ├── middleware/           # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── validation.js
│   ├── models/              # Database models
│   │   ├── User.js
│   │   ├── Blog.js
│   │   ├── Question.js
│   │   └── Connection.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── blogs.js
│   │   ├── questions.js
│   │   ├── connections.js
│   │   └── upload.js
│   ├── utils/               # Utility functions
│   │   ├── email.js
│   │   └── helpers.js
│   ├── scripts/             # Database scripts
│   │   └── seedDatabase.js
│   └── server.js            # Main server file
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/alumniconnect
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (with filtering)
- `GET /api/users/alumni` - Get alumni users
- `GET /api/users/:id` - Get single user
- `GET /api/users/:id/profile` - Get user profile with stats
- `GET /api/users/:id/blogs` - Get user's blogs
- `GET /api/users/:id/questions` - Get user's questions
- `PUT /api/users/avatar` - Update user avatar

### Blogs
- `GET /api/blogs` - Get all blogs (with filtering)
- `GET /api/blogs/featured` - Get featured blogs
- `GET /api/blogs/trending` - Get trending blogs
- `GET /api/blogs/my` - Get current user's blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `PUT /api/blogs/:id/like` - Like/unlike blog
- `POST /api/blogs/:id/comments` - Add comment to blog

### Questions
- `GET /api/questions` - Get all questions (with filtering)
- `GET /api/questions/trending` - Get trending questions
- `GET /api/questions/my` - Get current user's questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question
- `PUT /api/questions/:id/upvote` - Upvote question
- `PUT /api/questions/:id/downvote` - Downvote question
- `POST /api/questions/:id/answers` - Add answer to question
- `PUT /api/questions/:id/answers/:answerId/accept` - Accept answer

### Connections
- `GET /api/connections` - Get user connections
- `GET /api/connections/requests` - Get connection requests
- `GET /api/connections/sent` - Get sent requests
- `GET /api/connections/stats` - Get connection statistics
- `GET /api/connections/status/:userId` - Get connection status with user
- `POST /api/connections/request` - Send connection request
- `PUT /api/connections/:id/accept` - Accept connection
- `PUT /api/connections/:id/reject` - Reject connection
- `DELETE /api/connections/:id` - Remove connection

### Upload
- `POST /api/upload/image` - Upload image
- `POST /api/upload/avatar` - Upload avatar
- `DELETE /api/upload/:publicId` - Delete image

## Database Models

### User Model
- Personal information (name, email, role, batch, branch)
- Professional details (company, position, location)
- Profile data (bio, skills, social links, avatar)
- Authentication data (password, verification status)
- Connections and relationships

### Blog Model
- Content (title, content, excerpt, featured image)
- Metadata (author, category, tags, status)
- Engagement (likes, comments, views)
- Publishing information (published date, featured status)

### Question Model
- Question data (title, content, category, tags)
- Voting system (upvotes, downvotes)
- Answers with voting and acceptance
- Status tracking (open, closed, resolved)
- Trending algorithm

### Connection Model
- Connection relationship (requester, recipient)
- Status tracking (pending, accepted, rejected, blocked)
- Connection metadata (type, message, timestamps)

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Rate Limiting**: Prevent API abuse
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation and sanitization
- **Role-based Access**: Different permissions for students/alumni

## Error Handling

The API includes comprehensive error handling:
- Custom error middleware
- Validation error formatting
- MongoDB error handling
- JWT error handling
- 404 handling for unknown routes

## Testing

```bash
npm test
```

## Deployment

1. **Set environment variables** for production
2. **Build and deploy** to your preferred platform
3. **Set up MongoDB** connection
4. **Configure Cloudinary** for file uploads
5. **Set up email service** for notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.