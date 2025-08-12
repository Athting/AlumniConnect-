import Question from '../models/Question.js';

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
export const getQuestions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query.tags = { $in: tags };
    }

    // Search in title and content
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } },
      ];
    }

    // Sort
    let sortBy = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'newest':
          sortBy.createdAt = -1;
          break;
        case 'oldest':
          sortBy.createdAt = 1;
          break;
        case 'most-voted':
          sortBy = { 'upvotes.length': -1 };
          break;
        case 'most-answered':
          sortBy = { 'answers.length': -1 };
          break;
        case 'trending':
          sortBy.trendingScore = -1;
          break;
        default:
          sortBy.createdAt = -1;
      }
    } else {
      sortBy.createdAt = -1;
    }

    const questions = await Question.find(query)
      .populate('author', 'fullName avatar role company batch branch')
      .populate('answers.user', 'fullName avatar role company')
      .sort(sortBy)
      .limit(limit)
      .skip(startIndex);

    const total = await Question.countDocuments(query);

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
      count: questions.length,
      total,
      pagination,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'fullName avatar role company batch branch')
      .populate('answers.user', 'fullName avatar role company batch branch')
      .populate('answers.comments.user', 'fullName avatar role');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Increment views if not the author
    if (!req.user || question.author._id.toString() !== req.user.id) {
      await question.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new question
// @route   POST /api/questions
// @access  Private
export const createQuestion = async (req, res, next) => {
  try {
    req.body.author = req.user.id;

    const question = await Question.create(req.body);

    const populatedQuestion = await Question.findById(question._id)
      .populate('author', 'fullName avatar role company batch branch');

    res.status(201).json({
      success: true,
      data: populatedQuestion,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private
export const updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Make sure user is question owner
    if (question.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this question',
      });
    }

    question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('author', 'fullName avatar role company batch branch');

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Make sure user is question owner
    if (question.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this question',
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote/Remove upvote question
// @route   PUT /api/questions/:id/upvote
// @access  Private
export const toggleUpvoteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    await question.toggleUpvote(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        upvotes: question.upvotes.length,
        downvotes: question.downvotes.length,
        netVotes: question.upvotes.length - question.downvotes.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Downvote/Remove downvote question
// @route   PUT /api/questions/:id/downvote
// @access  Private
export const toggleDownvoteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    await question.toggleDownvote(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        upvotes: question.upvotes.length,
        downvotes: question.downvotes.length,
        netVotes: question.upvotes.length - question.downvotes.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add answer to question
// @route   POST /api/questions/:id/answers
// @access  Private
export const addAnswer = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    await question.addAnswer(req.user.id, req.body.content);

    const updatedQuestion = await Question.findById(req.params.id)
      .populate('answers.user', 'fullName avatar role company batch branch');

    res.status(201).json({
      success: true,
      data: updatedQuestion.answers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept answer
// @route   PUT /api/questions/:id/answers/:answerId/accept
// @access  Private
export const acceptAnswer = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    await question.acceptAnswer(req.params.answerId, req.user.id);

    const updatedQuestion = await Question.findById(req.params.id)
      .populate('answers.user', 'fullName avatar role company batch branch');

    res.status(200).json({
      success: true,
      data: updatedQuestion,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending questions
// @route   GET /api/questions/trending
// @access  Public
export const getTrendingQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ trending: true })
      .populate('author', 'fullName avatar role company batch branch')
      .sort({ trendingScore: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my questions
// @route   GET /api/questions/my
// @access  Private
export const getMyQuestions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const questions = await Question.find({ author: req.user.id })
      .populate('author', 'fullName avatar role company batch branch')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Question.countDocuments({ author: req.user.id });

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