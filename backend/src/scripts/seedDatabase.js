import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Question from '../models/Question.js';
import Connection from '../models/Connection.js';

dotenv.config();

// Sample data
const users = [
  {
    fullName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    password: 'password123',
    role: 'alumni',
    batch: '2019',
    branch: 'Computer Science',
    company: 'Google',
    position: 'Senior Software Engineer',
    location: 'Mountain View, CA',
    bio: 'Passionate about building scalable web applications and mentoring aspiring developers.',
    skills: ['React', 'Node.js', 'System Design', 'Leadership'],
    socialLinks: {
      linkedin: 'rajesh-kumar',
      github: 'rajeshkumar',
    },
    isVerified: true,
  },
  {
    fullName: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    role: 'alumni',
    batch: '2018',
    branch: 'Computer Science',
    company: 'Microsoft',
    position: 'Product Manager',
    location: 'Seattle, WA',
    bio: 'Helping build products that impact millions of users. Love mentoring new PMs.',
    skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Leadership'],
    socialLinks: {
      linkedin: 'priya-sharma-pm',
    },
    isVerified: true,
  },
  {
    fullName: 'Arjun Patel',
    email: 'arjun@example.com',
    password: 'password123',
    role: 'alumni',
    batch: '2020',
    branch: 'Statistics',
    company: 'Netflix',
    position: 'Data Scientist',
    location: 'Los Gatos, CA',
    bio: 'ML engineer working on recommendation systems. Happy to help with data science career.',
    skills: ['Machine Learning', 'Python', 'Statistics', 'Deep Learning'],
    socialLinks: {
      linkedin: 'arjun-patel-ds',
      github: 'arjunpatel',
    },
    isVerified: true,
  },
  {
    fullName: 'Sneha Reddy',
    email: 'sneha@example.com',
    password: 'password123',
    role: 'student',
    batch: '2024',
    branch: 'Computer Science',
    bio: 'Final year student interested in software development and product management.',
    skills: ['JavaScript', 'React', 'Python'],
    socialLinks: {
      linkedin: 'sneha-reddy',
    },
  },
  {
    fullName: 'Vikram Singh',
    email: 'vikram@example.com',
    password: 'password123',
    role: 'alumni',
    batch: '2017',
    branch: 'Computer Science',
    company: 'TechStart Inc.',
    position: 'Founder & CEO',
    location: 'Bangalore, India',
    bio: 'Founded multiple startups. Happy to share insights on entrepreneurship journey.',
    skills: ['Entrepreneurship', 'Fundraising', 'Team Building', 'Strategy'],
    socialLinks: {
      linkedin: 'vikram-singh-founder',
    },
    isVerified: true,
  },
];

const blogs = [
  {
    title: 'How I Landed My Dream Job at Google',
    content: `
      <p>Getting a job at Google was always a dream of mine since college. After months of preparation and multiple interview rounds, I finally made it. Here's my complete journey and the strategies that worked for me.</p>
      
      <h2>The Preparation Phase</h2>
      <p>I started preparing 6 months before applying. My preparation strategy included:</p>
      <ul>
        <li>Data Structures and Algorithms practice on LeetCode</li>
        <li>System Design fundamentals</li>
        <li>Mock interviews with peers</li>
        <li>Building side projects to showcase skills</li>
      </ul>
      
      <h2>The Interview Process</h2>
      <p>Google's interview process consists of multiple rounds:</p>
      <ol>
        <li>Phone screening with a recruiter</li>
        <li>Technical phone interview</li>
        <li>On-site interviews (5 rounds)</li>
        <li>Team matching</li>
      </ol>
      
      <h2>Key Tips for Success</h2>
      <p>Based on my experience, here are the most important tips:</p>
      <ul>
        <li>Practice coding problems daily</li>
        <li>Understand the fundamentals deeply</li>
        <li>Communicate your thought process clearly</li>
        <li>Ask clarifying questions</li>
        <li>Stay calm and confident</li>
      </ul>
      
      <p>Remember, rejection is part of the process. I was rejected by several companies before getting into Google. Keep learning and improving!</p>
    `,
    excerpt: 'A comprehensive guide on interview preparation, technical skills, and networking strategies that helped me secure a position at Google.',
    category: 'Career Advice',
    tags: ['google', 'interview', 'career', 'software engineering'],
    status: 'published',
    featured: true,
  },
  {
    title: 'Transitioning from Engineering to Product Management',
    content: `
      <p>Making the switch from engineering to product management was one of the best career decisions I've made. Here's how I made the transition and what I learned along the way.</p>
      
      <h2>Why I Made the Switch</h2>
      <p>After 3 years as a software engineer, I realized I was more interested in the "why" behind what we were building rather than just the "how". I wanted to have a broader impact on product strategy and user experience.</p>
      
      <h2>Skills I Had to Develop</h2>
      <ul>
        <li>User research and customer empathy</li>
        <li>Data analysis and metrics</li>
        <li>Business strategy and market analysis</li>
        <li>Communication and stakeholder management</li>
        <li>Product roadmap planning</li>
      </ul>
      
      <h2>How I Made the Transition</h2>
      <p>The transition wasn't overnight. Here's what I did:</p>
      <ol>
        <li>Started taking on PM-like responsibilities in my engineering role</li>
        <li>Took online courses on product management</li>
        <li>Built a side project and treated it like a product</li>
        <li>Networked with PMs in my company</li>
        <li>Applied for internal PM roles</li>
      </ol>
      
      <p>The engineering background has been incredibly valuable in my PM role, especially when working with technical teams and making technical trade-offs.</p>
    `,
    excerpt: 'My journey from being a software engineer to becoming a product manager, including skills needed and challenges faced.',
    category: 'Career Advice',
    tags: ['product management', 'career change', 'engineering'],
    status: 'published',
  },
  {
    title: 'Machine Learning Trends in 2024',
    content: `
      <p>The field of machine learning continues to evolve rapidly. As we progress through 2024, several key trends are shaping the industry. Here's what every data scientist should know.</p>
      
      <h2>1. Large Language Models (LLMs) Evolution</h2>
      <p>LLMs have moved beyond text generation to multimodal capabilities, integrating vision, audio, and text processing in unified models.</p>
      
      <h2>2. Edge AI and Model Optimization</h2>
      <p>There's a growing focus on deploying AI models on edge devices, requiring new optimization techniques and model compression methods.</p>
      
      <h2>3. Responsible AI and Ethics</h2>
      <p>Companies are investing heavily in AI safety, bias detection, and explainable AI systems.</p>
      
      <h2>4. AutoML and No-Code Solutions</h2>
      <p>Automated machine learning platforms are making AI more accessible to non-technical users.</p>
      
      <h2>5. Federated Learning</h2>
      <p>Privacy-preserving machine learning techniques are becoming mainstream, especially in healthcare and finance.</p>
      
      <p>These trends present both opportunities and challenges for data scientists. Staying updated with these developments is crucial for career growth.</p>
    `,
    excerpt: 'Exploring the latest developments in AI and ML that every data scientist should know about.',
    category: 'Technical Insights',
    tags: ['machine learning', 'ai', 'trends', 'data science'],
    status: 'published',
  },
];

const questions = [
  {
    title: 'How to prepare for Google software engineer interviews?',
    content: 'I have been preparing for Google SWE interviews for the past 3 months. Can anyone share their experience and tips for system design and coding rounds?',
    category: 'Interview Prep',
    tags: ['google', 'system design', 'coding interview'],
    status: 'open',
    trending: true,
  },
  {
    title: 'Best practices for React performance optimization',
    content: 'Working on a large React application and facing performance issues. What are the best practices for optimizing React apps? Any specific tools or techniques you recommend?',
    category: 'Technical',
    tags: ['react', 'performance', 'optimization'],
    status: 'open',
  },
  {
    title: 'Salary negotiation tips for mid-level engineers',
    content: 'I have an offer from a startup and want to negotiate the salary. What are some effective strategies for salary negotiation? How much room is typically there for negotiation?',
    category: 'Salary',
    tags: ['salary negotiation', 'startup', 'mid-level'],
    status: 'open',
  },
];

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Clear database
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Question.deleteMany({});
    await Connection.deleteMany({});
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

// Seed users
const seedUsers = async () => {
  try {
    const createdUsers = [];
    
    for (const userData of users) {
      const salt = await bcrypt.genSalt(12);
      userData.password = await bcrypt.hash(userData.password, salt);
      
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    
    console.log(`${createdUsers.length} users created`);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Seed blogs
const seedBlogs = async (users) => {
  try {
    const createdBlogs = [];
    
    for (let i = 0; i < blogs.length; i++) {
      const blogData = {
        ...blogs[i],
        author: users[i % users.length]._id,
        publishedAt: new Date(),
      };
      
      const blog = await Blog.create(blogData);
      createdBlogs.push(blog);
    }
    
    console.log(`${createdBlogs.length} blogs created`);
    return createdBlogs;
  } catch (error) {
    console.error('Error seeding blogs:', error);
  }
};

// Seed questions
const seedQuestions = async (users) => {
  try {
    const createdQuestions = [];
    
    for (let i = 0; i < questions.length; i++) {
      const questionData = {
        ...questions[i],
        author: users[(i + 1) % users.length]._id,
      };
      
      const question = await Question.create(questionData);
      createdQuestions.push(question);
    }
    
    console.log(`${createdQuestions.length} questions created`);
    return createdQuestions;
  } catch (error) {
    console.error('Error seeding questions:', error);
  }
};

// Seed connections
const seedConnections = async (users) => {
  try {
    const connections = [
      {
        requester: users[0]._id,
        recipient: users[1]._id,
        status: 'accepted',
        connectionType: 'professional',
        message: 'Would love to connect and share experiences!',
      },
      {
        requester: users[2]._id,
        recipient: users[0]._id,
        status: 'accepted',
        connectionType: 'mentorship',
        message: 'Looking for guidance in my career journey.',
      },
      {
        requester: users[3]._id,
        recipient: users[1]._id,
        status: 'pending',
        connectionType: 'professional',
        message: 'Interested in learning about product management.',
      },
    ];
    
    const createdConnections = await Connection.create(connections);
    console.log(`${createdConnections.length} connections created`);
    return createdConnections;
  } catch (error) {
    console.error('Error seeding connections:', error);
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    await connectDB();
    await clearDatabase();
    
    const users = await seedUsers();
    await seedBlogs(users);
    await seedQuestions(users);
    await seedConnections(users);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (process.argv[2] === '--seed') {
  seedDatabase();
}

export default seedDatabase;