import Blog from '../models/Blog.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = { status: 'published' };

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
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
      const sortField = req.query.sort.startsWith('-') ? req.query.sort.slice(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sortBy[sortField] = sortOrder;
    } else {
      sortBy.publishedAt = -1;
    }

    const blogs = await Blog.find(query)
      .populate('author', 'fullName avatar role company batch branch')
      .sort(sortBy)
      .limit(limit)
      .skip(startIndex);

    const total = await Blog.countDocuments(query);

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
      count: blogs.length,
      total,
      pagination,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'fullName avatar role company batch branch')
      .populate('comments.user', 'fullName avatar role');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (blog.status !== 'published' && (!req.user || blog.author._id.toString() !== req.user.id)) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Increment views if not the author
    if (!req.user || blog.author._id.toString() !== req.user.id) {
      await blog.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res, next) => {
  try {
    req.body.author = req.user.id;

    // Generate excerpt if not provided
    if (!req.body.excerpt && req.body.content) {
      req.body.excerpt = req.body.content.substring(0, 200) + '...';
    }

    const blog = await Blog.create(req.body);

    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'fullName avatar role company batch branch');

    res.status(201).json({
      success: true,
      data: populatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
export const updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Make sure user is blog owner
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this blog',
      });
    }

    // Generate excerpt if content is updated and excerpt is not provided
    if (req.body.content && !req.body.excerpt) {
      req.body.excerpt = req.body.content.substring(0, 200) + '...';
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('author', 'fullName avatar role company batch branch');

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Make sure user is blog owner
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this blog',
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike blog
// @route   PUT /api/blogs/:id/like
// @access  Private
export const toggleLikeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    await blog.toggleLike(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        likes: blog.likes.length,
        isLiked: blog.likes.some(like => like.user.toString() === req.user.id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    await blog.addComment(req.user.id, req.body.content);

    const updatedBlog = await Blog.findById(req.params.id)
      .populate('comments.user', 'fullName avatar role');

    res.status(201).json({
      success: true,
      data: updatedBlog.comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured blogs
// @route   GET /api/blogs/featured
// @access  Public
export const getFeaturedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ 
      status: 'published', 
      featured: true 
    })
      .populate('author', 'fullName avatar role company batch branch')
      .sort({ publishedAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending blogs
// @route   GET /api/blogs/trending
// @access  Public
export const getTrendingBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .populate('author', 'fullName avatar role company batch branch')
      .sort({ views: -1, 'likes.length': -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my blogs
// @route   GET /api/blogs/my
// @access  Private
export const getMyBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const blogs = await Blog.find({ author: req.user.id })
      .populate('author', 'fullName avatar role company batch branch')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Blog.countDocuments({ author: req.user.id });

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