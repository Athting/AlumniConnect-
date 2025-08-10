import React, { useState } from "react";
import {
  MessageCircle,
  ThumbsUp,
  Eye,
  Clock,
  User,
  Search,
  Plus,
  Filter,
  TrendingUp,
  Star,
} from "lucide-react";
import { Card, Badge, Button, Input } from "../ui";

const QnAForum = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Career Advice",
    "Technical",
    "Interview Prep",
    "Salary",
    "Job Search",
    "Work-Life Balance",
  ];

  const questions = [
    {
      id: 1,
      title: "How to prepare for Google software engineer interviews?",
      content:
        "I have been preparing for Google SWE interviews for the past 3 months. Can anyone share their experience and tips for system design and coding rounds?",
      author: "Rohit Kumar",
      authorAvatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      timeAgo: "2 hours ago",
      category: "Interview Prep",
      tags: ["Google", "System Design", "Coding Interview"],
      upvotes: 24,
      answers: 8,
      views: 156,
      hasAcceptedAnswer: true,
      trending: true,
    },
    {
      id: 2,
      title: "Transitioning from development to product management",
      content:
        "I have 3 years of experience as a software engineer and want to move into product management. What skills should I develop and how should I approach this transition?",
      author: "Priya Singh",
      authorAvatar:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      timeAgo: "4 hours ago",
      category: "Career Advice",
      tags: ["Product Management", "Career Switch", "Skills"],
      upvotes: 18,
      answers: 5,
      views: 89,
      hasAcceptedAnswer: false,
      trending: false,
    },
    {
      id: 3,
      title: "Best practices for React performance optimization",
      content:
        "Working on a large React application and facing performance issues. What are the best practices for optimizing React apps? Any specific tools or techniques you recommend?",
      author: "Arjun Patel",
      authorAvatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h-150&dpr=2",
      timeAgo: "1 day ago",
      category: "Technical",
      tags: ["React", "Performance", "Optimization"],
      upvotes: 32,
      answers: 12,
      views: 234,
      hasAcceptedAnswer: true,
      trending: true,
    },
    {
      id: 4,
      title: "Salary negotiation tips for mid-level engineers",
      content:
        "I have an offer from a startup and want to negotiate the salary. What are some effective strategies for salary negotiation? How much room is typically there for negotiation?",
      author: "Sneha Reddy",
      authorAvatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      timeAgo: "2 days ago",
      category: "Salary",
      tags: ["Salary Negotiation", "Startup", "Mid-level"],
      upvotes: 45,
      answers: 15,
      views: 312,
      hasAcceptedAnswer: true,
      trending: false,
    },
    {
      id: 5,
      title: "Remote work vs office: Pros and cons for career growth",
      content:
        "Considering between a remote position at a tech giant vs an office role at a growing startup. What are the implications for career growth in both scenarios?",
      author: "Vikram Singh",
      authorAvatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      timeAgo: "3 days ago",
      category: "Work-Life Balance",
      tags: ["Remote Work", "Career Growth", "Startup vs Big Tech"],
      upvotes: 28,
      answers: 9,
      views: 187,
      hasAcceptedAnswer: false,
      trending: false,
    },
    {
      id: 6,
      title: "Breaking into data science without a CS degree",
      content:
        "I have a mechanical engineering background but want to transition into data science. What learning path would you recommend? Any bootcamps or certifications that helped you?",
      author: "Anita Gupta",
      authorAvatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      timeAgo: "1 week ago",
      category: "Career Advice",
      tags: ["Data Science", "Career Change", "Non-CS Background"],
      upvotes: 67,
      answers: 22,
      views: 456,
      hasAcceptedAnswer: true,
      trending: false,
    },
  ];

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || question.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const trendingQuestions = questions.filter((q) => q.trending);

  return (
    <section
      id="qna"
      className={`py-20 ${darkMode ? "bg-slate-800" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Q&A Forum
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get your career and technical questions answered by experienced
            alumni and professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Actions */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search questions, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={Search}
                    darkMode={darkMode}
                  />
                </div>
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "primary" : "ghost"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredQuestions.map((question) => (
                <Card
                  key={question.id}
                  darkMode={darkMode}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2 text-center min-w-[60px]">
                      <div
                        className={`flex items-center space-x-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {question.upvotes}
                        </span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${
                          question.hasAcceptedAnswer
                            ? "text-green-600"
                            : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {question.answers}
                        </span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{question.views}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className={`text-lg font-semibold hover:text-blue-600 cursor-pointer ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {question.title}
                          {question.trending && (
                            <TrendingUp className="w-4 h-4 text-orange-500 inline ml-2" />
                          )}
                        </h3>
                        {question.hasAcceptedAnswer && (
                          <Badge variant="success" size="sm">
                            <Star className="w-3 h-3 mr-1" />
                            Solved
                          </Badge>
                        )}
                      </div>

                      <p
                        className={`text-sm leading-relaxed mb-4 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {question.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" size="sm">
                          {question.category}
                        </Badge>
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={question.authorAvatar}
                            alt={question.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {question.author}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`flex items-center space-x-1 text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          <span>{question.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Questions
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Trending Questions */}
              <Card darkMode={darkMode} className="p-6">
                <h4
                  className={`text-lg font-semibold mb-4 flex items-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                  Trending
                </h4>
                <div className="space-y-3">
                  {trendingQuestions.slice(0, 3).map((question) => (
                    <div key={question.id} className="group cursor-pointer">
                      <h5
                        className={`text-sm font-medium hover:text-blue-600 transition-colors line-clamp-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {question.title}
                      </h5>
                      <div
                        className={`flex items-center space-x-4 text-xs mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <span>{question.upvotes} upvotes</span>
                        <span>{question.answers} answers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Contributors */}
              <Card darkMode={darkMode} className="p-6">
                <h4
                  className={`text-lg font-semibold mb-4 flex items-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Contributors
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      name: "Rajesh Kumar",
                      answers: 45,
                      avatar:
                        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
                    },
                    {
                      name: "Priya Sharma",
                      answers: 38,
                      avatar:
                        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
                    },
                    {
                      name: "Arjun Patel",
                      answers: 32,
                      avatar:
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
                    },
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {contributor.name}
                        </p>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {contributor.answers} helpful answers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Forum Stats */}
              <Card darkMode={darkMode} className="p-6">
                <h4
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Forum Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Questions
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      1,234
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Answers
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      3,567
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Users
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      2,890
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Solved
                    </span>
                    <span className={`text-sm font-medium text-green-600`}>
                      89%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QnAForum;
