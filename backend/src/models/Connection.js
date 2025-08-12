import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending',
  },
  message: {
    type: String,
    maxlength: [500, 'Connection message cannot exceed 500 characters'],
  },
  connectionType: {
    type: String,
    enum: ['professional', 'mentorship', 'collaboration', 'friendship'],
    default: 'professional',
  },
  acceptedAt: {
    type: Date,
  },
  rejectedAt: {
    type: Date,
  },
  blockedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate connections
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });
connectionSchema.index({ recipient: 1, status: 1 });
connectionSchema.index({ requester: 1, status: 1 });

// Pre-save middleware to set timestamps
connectionSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    const now = new Date();
    switch (this.status) {
      case 'accepted':
        this.acceptedAt = now;
        break;
      case 'rejected':
        this.rejectedAt = now;
        break;
      case 'blocked':
        this.blockedAt = now;
        break;
    }
  }
  next();
});

// Static method to get connection status between two users
connectionSchema.statics.getConnectionStatus = async function(userId1, userId2) {
  const connection = await this.findOne({
    $or: [
      { requester: userId1, recipient: userId2 },
      { requester: userId2, recipient: userId1 }
    ]
  });
  
  return connection ? connection.status : 'none';
};

// Method to accept connection
connectionSchema.methods.accept = function() {
  this.status = 'accepted';
  return this.save();
};

// Method to reject connection
connectionSchema.methods.reject = function() {
  this.status = 'rejected';
  return this.save();
};

export default mongoose.model('Connection', connectionSchema);