import React from 'react';
import { Calendar, Eye, Heart, MessageCircle, User, Tag } from 'lucide-react';

interface FeaturedBlogsProps {
  darkMode: boolean;
}

export default function FeaturedBlogs({ darkMode }: FeaturedBlogsProps) {
  const blogs = [
    {
      id: 1,
      title: 'Breaking into Tech: My Journey from College to FAANG',
      excerpt: 'From struggling with algorithms to landing my dream job at Google. Here are the strategies that worked for me.',
      author: {
        name: 'Sarah Chen',
        role: 'Software Engineer at Google',
        batch: '2019',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      coverImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      stats: {
        views: 2847,
        likes: 156,
        comments: 23,
      },
      tags: ['Career', 'Tech', 'Interview'],
      featured: true,
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Building Your LinkedIn Profile as a Student',
      excerpt: 'Stand out to recruiters with these proven LinkedIn optimization strategies specifically designed for students.',
      author: {
        name: 'Michael Rodriguez',
        role: 'Product Manager at Microsoft',
        batch: '2018',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      coverImage: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '2024-01-12',
      readTime: '6 min read',
      stats: {
        views: 1923,
        likes: 89,
        comments: 15,
      },
      tags: ['LinkedIn', 'Personal Branding', 'Career'],
    },
    {
      id: 3,
      title: 'From Startup to IPO: Lessons I Learned as a Founding Engineer',
      excerpt: 'The challenges, victories, and key insights from my 5-year journey at a startup that went public.',
      author: {
        name: 'Priya Sharma',
        role: 'CTO at TechFlow',
        batch: '2016',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      coverImage: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '2024-01-10',
      readTime: '12 min read',
      stats: {
        views: 3456,
        likes: 203,
        comments: 45,
      },
      tags: ['Startup', 'Leadership', 'IPO'],
    },
    {
      id: 4,
      title: 'Data Science Career Path: Skills You Need in 2024',
      excerpt: 'A comprehensive guide to the essential skills, tools, and mindset needed to succeed in data science.',
      author: {
        name: 'David Kim',
        role: 'Senior Data Scientist at Netflix',
        batch: '2017',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '2024-01-08',
      readTime: '10 min read',
      stats: {
        views: 2134,
        likes: 127,
        comments: 31,
      },
      tags: ['Data Science', 'Machine Learning', 'Career Path'],
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section id="blogs" className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Blogs & Career Advice
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn from successful alumni who share their real-world experiences, career insights, and industry knowledge.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Career', 'Tech', 'Startup', 'Interview', 'Data Science'].map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  tag === 'All'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : darkMode
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blog (First blog gets special treatment) */}
        <div className={`rounded-3xl overflow-hidden mb-12 shadow-2xl ${
          darkMode ? 'bg-slate-700' : 'bg-white'
        } group hover:shadow-3xl transition-all duration-500`}>
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative overflow-hidden h-64 md:h-full">
                <img
                  src={blogs[0].coverImage}
                  alt={blogs[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={blogs[0].author.avatar}
                  alt={blogs[0].author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {blogs[0].author.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {blogs[0].author.role} • Batch {blogs[0].author.batch}
                  </p>
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                {blogs[0].title}
              </h3>
              
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {blogs[0].excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {blogs[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      darkMode 
                        ? 'bg-slate-600 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm">
                  <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blogs[0].publishedAt)}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Eye className="h-4 w-4" />
                    <span>{formatNumber(blogs[0].stats.views)}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Heart className="h-4 w-4" />
                    <span>{blogs[0].stats.likes}</span>
                  </div>
                </div>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {blogs[0].readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((blog) => (
            <article
              key={blog.id}
              className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${
                darkMode ? 'bg-slate-700' : 'bg-white'
              } transform hover:-translate-y-2`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {blog.author.name}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Batch {blog.author.batch}
                    </p>
                  </div>
                </div>

                <h3 className={`text-lg font-bold mb-3 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                  {blog.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs font-medium rounded-md ${
                        darkMode 
                          ? 'bg-slate-600 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className={`px-2 py-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      +{blog.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(blog.stats.views)}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Heart className="h-3 w-3" />
                      <span>{blog.stats.likes}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MessageCircle className="h-3 w-3" />
                      <span>{blog.stats.comments}</span>
                    </div>
                  </div>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
}