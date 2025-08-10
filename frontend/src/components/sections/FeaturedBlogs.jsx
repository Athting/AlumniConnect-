import React from "react";
import {
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { Card, Badge, Button } from "../ui";
import { BLOG_CATEGORIES } from "../../utils/constants";

const FeaturedBlogs = ({ darkMode }) => {
  const blogs = [
    {
      id: 1,
      title: "How I Landed My Dream Job at Google",
      excerpt:
        "A comprehensive guide on interview preparation, technical skills, and networking strategies that helped me secure a position at Google.",
      author: "Rajesh Kumar",
      authorRole: "Software Engineer at Google",
      authorAvatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Career Advice",
      likes: 156,
      comments: 23,
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
      featured: true,
    },
    {
      id: 2,
      title: "Transitioning from Engineering to Product Management",
      excerpt:
        "My journey from being a software engineer to becoming a product manager, including skills needed and challenges faced.",
      author: "Priya Sharma",
      authorRole: "Product Manager at Microsoft",
      authorAvatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Career Advice",
      likes: 89,
      comments: 15,
      image:
        "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    },
    {
      id: 3,
      title: "Machine Learning Trends in 2024",
      excerpt:
        "Exploring the latest developments in AI and ML that every data scientist should know about.",
      author: "Arjun Patel",
      authorRole: "Data Scientist at Netflix",
      authorAvatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "2024-01-08",
      readTime: "12 min read",
      category: "Technical Insights",
      likes: 234,
      comments: 45,
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    },
    {
      id: 4,
      title: "Building a Startup: Lessons from the Trenches",
      excerpt:
        "Key insights and practical advice for aspiring entrepreneurs based on real startup experience.",
      author: "Sneha Reddy",
      authorRole: "Founder at TechStart",
      authorAvatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Entrepreneurship",
      likes: 178,
      comments: 32,
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    },
  ];

  const categoryColors = {
    "Career Advice": "primary",
    "Technical Insights": "secondary",
    Entrepreneurship: "success",
    "Industry Trends": "warning",
    "Academic Life": "info",
    "Personal Growth": "danger",
  };

  return (
    <section
      id="blogs"
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
            Featured Blogs
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover insights, career advice, and industry trends shared by our
            successful alumni community.
          </p>
        </div>

        {/* Featured Blog */}
        <div className="mb-16">
          <Card darkMode={darkMode} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant={categoryColors[blogs[0].category]} size="sm">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {blogs[0].category}
                  </Badge>
                  <Badge variant="default" size="sm">
                    Featured
                  </Badge>
                </div>

                <h3
                  className={`text-2xl font-bold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {blogs[0].title}
                </h3>

                <p
                  className={`text-lg leading-relaxed mb-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {blogs[0].excerpt}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={blogs[0].authorAvatar}
                      alt={blogs[0].author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {blogs[0].author}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {blogs[0].authorRole}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(blogs[0].date).toLocaleDateString()}
                      </span>
                      <span>{blogs[0].readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span
                      className={`flex items-center ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {blogs[0].likes} likes
                    </span>
                    <span
                      className={`flex items-center ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {blogs[0].comments} comments
                    </span>
                  </div>

                  <Button variant="outline" size="sm">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.slice(1).map((blog) => (
            <Card
              key={blog.id}
              darkMode={darkMode}
              className="overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={categoryColors[blog.category]} size="sm">
                    {blog.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {blog.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.authorAvatar}
                      alt={blog.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {blog.author}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {blog.readTime}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`flex items-center ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {blog.likes}
                    </span>
                    <span
                      className={`flex items-center ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {blog.comments}
                    </span>
                  </div>

                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {BLOG_CATEGORIES.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform"
              >
                {category}
              </Button>
            ))}
          </div>

          <Button variant="primary" size="lg">
            View All Blogs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
