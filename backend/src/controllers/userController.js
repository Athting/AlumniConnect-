import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Question from '../models/Question.js';

// @desc    Get all users with filtering, sorting, and pagination
// @route   GET /api/users
// @access  Public
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = { isActive: true };

    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }

    // Filter by batch
    if (req.query.batch) {
      query.batch = req.query.batch;
    }

    // Filter by branch
    if (req.query.branch) {
      query.branch = req.query.branch;
    }

    // Filter by company
    if (req.query.company) {
      query.company = { $regex: req.query.company, $options: 'i' };
    }

    // Filter by skills
    if (req.query.skills) {
      const skills = req.query.skills.split(',');
      query.skills = { $in: skills };
    }

    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Sort
    let sortBy = {};
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') ? req.query.sort.slice(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sortBy[sortField] = sortOrder;
    } else {
      sortBy.createdAt = -1;
    }

    const users = await User.find(query)
      .sort(sortBy)
      .limit(limit)
      .skip(startIndex)
      .select('-password');

    const total = await User.countDocuments(query);

    // Pagination result
    const pagination = {};

    if (startIndex + limit < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile with stats
// @route   GET /api/users/:id/profile
// @access  Public
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get user stats
    const [blogCount, questionCount, answerCount] = await Promise.all([
      Blog.countDocuments({ author: user._id, status: 'published' }),
      Question.countDocuments({ author: user._id }),
      Question.countDocuments({ 'answers.user': user._id }),
    ]);

    const profile = {
      ...user.toObject(),
      stats: {
        blogs: blogCount,
        questions: questionCount,
        answers: answerCount,
        connections: user.connections.filter(conn => conn.status === 'accepted').length,
      },
    };

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's blogs
// @route   GET /api/users/:id/blogs
// @access  Public
export const getUserBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const blogs = await Blog.find({ 
      author: req.params.id, 
      status: 'published' 
    })
      .populate('author', 'fullName avatar role company')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Blog.countDocuments({ 
      author: req.params.id, 
      status: 'published' 
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's questions
// @route   GET /api/users/:id/questions
// @access  Public
export const getUserQuestions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const questions = await Question.find({ author: req.params.id })
      .populate('author', 'fullName avatar role company')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Question.countDocuments({ author: req.params.id });

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get alumni by batch and branch
// @route   GET /api/users/alumni
// @access  Public
export const getAlumni = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    let query = { role: 'alumni', isActive: true };

    // Filter by batch
    if (req.query.batch) {
      query.batch = req.query.batch;
    }

    // Filter by branch
    if (req.query.branch) {
      query.branch = req.query.branch;
    }

    // Filter by company
    if (req.query.company) {
      query.company = { $regex: req.query.company, $options: 'i' };
    }

    // Search
    if (req.query.search) {
      query.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { company: { $regex: req.query.search, $options: 'i' } },
        { position: { $regex: req.query.search, $options: 'i' } },
        { skills: { $in: [new RegExp(req.query.search, 'i')] } },
      ];
    }

    const alumni = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: alumni.length,
      total,
      data: alumni,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
export const updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};