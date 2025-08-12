import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Question title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Question content is required'],
    maxlength: [2000, 'Content cannot exceed 2000 characters'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Career Advice',
      'Technical',
      'Interview Prep',
      'Salary',
      'Job Search',
      'Work-Life Balance',
      'Academic',
      'General',
    ],
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  status: {
    type: String,
    enum: ['open', 'closed', 'resolved'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  views: {
    type: Number,
    default: 0,
  },
  upvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  downvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  answers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: [3000, 'Answer cannot exceed 3000 characters'],
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    upvotes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      votedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    downvotes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      votedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
        maxlength: [500, 'Comment cannot exceed 500 characters'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  followers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    followedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  trending: {
    type: Boolean,
    default: false,
  },
  trendingScore: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
questionSchema.index({ author: 1, status: 1 });
questionSchema.index({ category: 1, status: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ views: -1 });
questionSchema.index({ trendingScore: -1 });
questionSchema.index({ 'upvotes.user': 1 });

// Virtual for upvote count
questionSchema.virtual('upvoteCount').get(function() {
  return this.upvotes.length;
});

// Virtual for downvote count
questionSchema.virtual('downvoteCount').get(function() {
  return this.downvotes.length;
});

// Virtual for answer count
questionSchema.virtual('answerCount').get(function() {
  return this.answers.length;
});

// Virtual for net votes
questionSchema.virtual('netVotes').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Virtual for has accepted answer
questionSchema.virtual('hasAcceptedAnswer').get(function() {
  return this.answers.some(answer => answer.isAccepted);
});

// Calculate trending score
questionSchema.pre('save', function(next) {
  // Simple trending algorithm based on votes, answers, views, and recency
  const hoursOld = (Date.now() - this.createdAt) / (1000 * 60 * 60);
  const gravity = 1.8;
  
  this.trendingScore = (this.upvotes.length + this.answers.length * 2 + this.views * 0.1) / Math.pow(hoursOld + 2, gravity);
  
  // Mark as trending if score is above threshold
  this.trending = this.trendingScore > 5;
  
  next();
});

// Method to increment views
questionSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to toggle upvote
questionSchema.methods.toggleUpvote = function(userId) {
  const existingUpvote = this.upvotes.find(vote => vote.user.toString() === userId.toString());
  const existingDownvote = this.downvotes.find(vote => vote.user.toString() === userId.toString());
  
  // Remove downvote if exists
  if (existingDownvote) {
    this.downvotes = this.downvotes.filter(vote => vote.user.toString() !== userId.toString());
  }
  
  // Toggle upvote
  if (existingUpvote) {
    this.upvotes = this.upvotes.filter(vote => vote.user.toString() !== userId.toString());
  } else {
    this.upvotes.push({ user: userId });
  }
  
  return this.save();
};

// Method to toggle downvote
questionSchema.methods.toggleDownvote = function(userId) {
  const existingUpvote = this.upvotes.find(vote => vote.user.toString() === userId.toString());
  const existingDownvote = this.downvotes.find(vote => vote.user.toString() === userId.toString());
  
  // Remove upvote if exists
  if (existingUpvote) {
    this.upvotes = this.upvotes.filter(vote => vote.user.toString() !== userId.toString());
  }
  
  // Toggle downvote
  if (existingDownvote) {
    this.downvotes = this.downvotes.filter(vote => vote.user.toString() !== userId.toString());
  } else {
    this.downvotes.push({ user: userId });
  }
  
  return this.save();
};

// Method to add answer
questionSchema.methods.addAnswer = function(userId, content) {
  this.answers.push({
    user: userId,
    content: content,
  });
  return this.save();
};

// Method to accept answer
questionSchema.methods.acceptAnswer = function(answerId, authorId) {
  if (this.author.toString() !== authorId.toString()) {
    throw new Error('Only question author can accept answers');
  }
  
  // Remove accepted status from all answers
  this.answers.forEach(answer => {
    answer.isAccepted = false;
  });
  
  // Set the specified answer as accepted
  const answer = this.answers.id(answerId);
  if (answer) {
    answer.isAccepted = true;
    this.status = 'resolved';
  }
  
  return this.save();
};

export default mongoose.model('Question', questionSchema);