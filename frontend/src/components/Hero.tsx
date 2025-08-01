import React, { useState } from 'react';
import { Search, ArrowRight, Users, BookOpen, MessageCircle, Star } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
  onExplore: () => void;
  onSearch: (query: string) => void;
}

export default function Hero({ darkMode, onExplore, onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const stats = [
    { icon: Users, label: 'Active Alumni', value: '2,500+' },
    { icon: BookOpen, label: 'Blog Posts', value: '1,200+' },
    { icon: MessageCircle, label: 'Q&A Threads', value: '850+' },
    { icon: Star, label: 'Success Stories', value: '400+' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Students and alumni connecting"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-indigo-900/90' 
            : 'bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-blue-800/90'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Bridge the Gap Between
              <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Students & Alumni
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Connect with successful alumni, share knowledge through blogs, and get career guidance 
              in our thriving community platform.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Alumni, Blogs, Questions..."
                  className={`w-full pl-12 pr-32 py-4 text-lg rounded-2xl border-0 focus:ring-4 transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-800/90 text-white placeholder-gray-400 focus:ring-blue-500/50' 
                      : 'bg-white/95 text-gray-900 placeholder-gray-500 focus:ring-blue-500/50'
                  } backdrop-blur-sm shadow-2xl`}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onExplore}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
            >
              <span>Start Exploring</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <Icon className="h-8 w-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
}