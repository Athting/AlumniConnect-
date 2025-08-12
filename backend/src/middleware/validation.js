import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
export const validateRegister = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['student', 'alumni', 'faculty'])
    .withMessage('Role must be student, alumni, or faculty'),
  body('batch')
    .notEmpty()
    .withMessage('Batch year is required'),
  body('branch')
    .notEmpty()
    .withMessage('Branch is required'),
  body('company')
    .if(body('role').equals('alumni'))
    .notEmpty()
    .withMessage('Company is required for alumni'),
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Blog validation rules
export const validateBlog = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters long'),
  body('category')
    .isIn([
      'Career Advice',
      'Technical Insights',
      'Industry Trends',
      'Academic Life',
      'Entrepreneurship',
      'Personal Growth',
    ])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];

// Question validation rules
export const validateQuestion = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Content must be between 20 and 2000 characters'),
  body('category')
    .isIn([
      'Career Advice',
      'Technical',
      'Interview Prep',
      'Salary',
      'Job Search',
      'Work-Life Balance',
      'Academic',
      'General',
    ])
    .withMessage('Invalid category'),
];

// Answer validation rules
export const validateAnswer = [
  body('content')
    .trim()
    .isLength({ min: 20, max: 3000 })
    .withMessage('Answer must be between 20 and 3000 characters'),
];

// Comment validation rules
export const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters'),
];