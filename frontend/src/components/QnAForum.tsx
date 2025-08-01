import React, { useState } from 'react';
import { MessageCircle, User, Clock, ArrowUp, ArrowDown, CheckCircle, Tag, TrendingUp, HelpCircle } from 'lucide-react';

interface QnAForumProps {
  darkMode: boolean;
}

export default function QnAForum({ darkMode }: QnAForumProps) {
  const [activeTab, setActiveTab] = useState('trending');

  const questions = [
    {
      id: 1,
      title: 'How to transition from web development to machine learning?',
      description: 'I have 2 years of experience in React and Node.js, but I want to move into ML. What should be my learning path?',
      author: {
        name: 'Rahul Kumar',
        role: 'Student',
        batch: '2024',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      tags: ['Machine Learning', 'Career Transition', 'Web Development'],
      stats: {
        upvotes: 23,
        answers: 5,
        views: 156,
      },
      timeAgo: '2 hours ago',
      hasAcceptedAnswer: false,
      trending: true,
      topAnswer: {
        author: 'Sarah Chen',
        role: 'ML Engineer at Google',
        preview: 'Start with Python fundamentals, then move to pandas, numpy, and scikit-learn. Focus on statistics...',
        upvotes: 15,
      },
    },
    {
      id: 2,
      title: 'Best practices for system design interviews at FAANG?',
      description: 'I have interviews coming up at Google and Meta. What are the key concepts I should focus on for system design rounds?',
      author: {
        name: 'Priya Singh',
        role: 'Student',
        batch: '2024',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      tags: ['System Design', 'FAANG', 'Interview', 'Software Engineering'],
      stats: {
        upvotes: 45,
        answers: 8,
        views: 289,
      },
      timeAgo: '5 hours ago',
      hasAcceptedAnswer: true,
      trending: true,
      topAnswer: {
        author: 'Michael Rodriguez',
        role: 'Senior SDE at Microsoft',
        preview: 'Focus on scalability, load balancing, database design, and caching. Practice with real examples...',
        upvotes: 32,
      },
    },
    {
      id: 3,
      title: 'Should I do an MBA after 3 years of software engineering experience?',
      description: 'I want to move into product management eventually. Is an MBA worth it, or should I transition directly?',
      author: {
        name: 'Arjun Patel',
        role: 'Alumni',
        batch: '2021',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      tags: ['MBA', 'Product Management', 'Career Advice'],
      stats: {
        upvotes: 18,
        answers: 12,
        views: 234,
      },
      timeAgo: '1 day ago',
      hasAcceptedAnswer: false,
      trending: false,
      topAnswer: {
        author: 'David Kim',
        role: 'Product Manager at Netflix',
        preview: 'It depends on your goals. MBA gives you network and business skills, but direct transition is possible...',
        upvotes: 21,
      },
    },
    {
      id: 4,
      title: 'How to negotiate salary for first job out of college?',
      description: 'I received an offer but I think the salary is below market rate. How should I approach salary negotiation as a fresh graduate?',
      author: {
        name: 'Sneha Gupta',
        role: 'Student',
        batch: '2024',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      tags: ['Salary Negotiation', 'Fresh Graduate', 'Career Advice'],
      stats: {
        upvotes: 31,
        answers: 6,
        views: 178,
      },
      timeAgo: '6 hours ago',
      hasAcceptedAnswer: true,
      trending: true,
      topAnswer: {
        author: 'Emily Johnson',
        role: 'HR Director at Airbnb',
        preview: 'Research market rates, highlight your unique value proposition, and be prepared to justify...',
        upvotes: 28,
      },
    },
  ];

  const categories = [
    { name: 'Trending', key: 'trending', icon: TrendingUp, count: 12 },
    { name: 'Career Advice', key: 'career', icon: User, count: 45 },
    { name: 'Technical', key: 'technical', icon: MessageCircle, count: 23 },
    { name: 'Interview Prep', key: 'interview', icon: CheckCircle, count: 18 },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section id="qna" className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Q&A Forum
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get your career questions answered by experienced alumni. Share knowledge and help fellow students succeed.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <HelpCircle className="h-5 w-5 inline mr-2" />
            Ask a Question
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar with Categories */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setActiveTab(category.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        activeTab === category.key
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : darkMode
                          ? 'text-gray-300 hover:bg-slate-600 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-lg ${
                        activeTab === category.key
                          ? 'bg-white/20'
                          : darkMode
                          ? 'bg-slate-600'
                          : 'bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
                <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Forum Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Questions
                    </span>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      1,248
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Answered
                    </span>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      1,089
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      This Week
                    </span>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      47
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    darkMode ? 'bg-slate-700' : 'bg-white'
                  } border ${darkMode ? 'border-slate-600' : 'border-gray-200'}`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Author Avatar */}
                    <img
                      src={question.author.avatar}
                      alt={question.author.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className={`text-lg font-bold group-hover:text-blue-600 transition-colors cursor-pointer ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {question.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm mt-1">
                            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {question.author.name}
                            </span>
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {question.author.role}
                            </span>
                            {question.author.batch && (
                              <>
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Batch {question.author.batch}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {question.trending && (
                            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-lg">
                              Trending
                            </span>
                          )}
                          {question.hasAcceptedAnswer && (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                        {question.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              darkMode 
                                ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            } cursor-pointer transition-colors`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Top Answer Preview */}
                      {question.topAnswer && (
                        <div className={`p-4 rounded-xl mb-4 ${
                          darkMode ? 'bg-slate-600' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Top Answer by {question.topAnswer.author}
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              • {question.topAnswer.role}
                            </span>
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                            {question.topAnswer.preview}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <ArrowUp className="h-4 w-4 text-emerald-500" />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {question.topAnswer.upvotes} upvotes
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Stats and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-1">
                            <ArrowUp className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {question.stats.upvotes}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {question.stats.answers} answers
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatNumber(question.stats.views)} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {question.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Load More Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}