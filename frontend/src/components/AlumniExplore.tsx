import React, { useState } from 'react';
import { Search, Filter, MapPin, Building, Calendar, Users, Heart, MessageCircle, Star } from 'lucide-react';

interface AlumniExploreProps {
  darkMode: boolean;
}

export default function AlumniExplore({ darkMode }: AlumniExploreProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    batch: 'all',
    company: 'all',
    domain: 'all',
  });

  const alumni = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Google',
      batch: '2019',
      branch: 'Computer Science',
      location: 'Mountain View, CA',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['React', 'Python', 'Machine Learning', 'System Design'],
      followers: 1234,
      following: 456,
      posts: 23,
      rating: 4.9,
      experience: '5+ years',
      verified: true,
      recentActivity: 'Posted about career tips',
      connections: 567,
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      company: 'Microsoft',
      batch: '2018',
      branch: 'Computer Science',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Product Strategy', 'Data Analysis', 'Leadership', 'Agile'],
      followers: 892,
      following: 234,
      posts: 15,
      rating: 4.8,
      experience: '6+ years',
      verified: true,
      recentActivity: 'Answered 3 questions',
      connections: 789,
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'CTO & Co-founder',
      company: 'TechFlow',
      batch: '2016',
      branch: 'Computer Science',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Leadership', 'Full-Stack', 'Startup', 'Team Building'],
      followers: 2456,
      following: 123,
      posts: 34,
      rating: 4.9,
      experience: '8+ years',
      verified: true,
      recentActivity: 'Shared startup insights',
      connections: 1234,
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Senior Data Scientist',
      company: 'Netflix',
      batch: '2017',
      branch: 'Computer Science',
      location: 'Los Gatos, CA',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Machine Learning', 'Python', 'Statistics', 'Deep Learning'],
      followers: 1567,
      following: 345,
      posts: 28,
      rating: 4.7,
      experience: '7+ years',
      verified: true,
      recentActivity: 'Published ML blog',
      connections: 892,
    },
    {
      id: 5,
      name: 'Emily Johnson',
      role: 'UX Design Lead',
      company: 'Airbnb',
      batch: '2019',
      branch: 'Design',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['UI/UX', 'Figma', 'Design Systems', 'User Research'],
      followers: 934,
      following: 567,
      posts: 19,
      rating: 4.8,
      experience: '5+ years',
      verified: true,
      recentActivity: 'Shared design tips',
      connections: 456,
    },
    {
      id: 6,
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      company: 'Amazon',
      batch: '2020',
      branch: 'Computer Science',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['AWS', 'Kubernetes', 'Docker', 'CI/CD'],
      followers: 678,
      following: 234,
      posts: 12,
      rating: 4.6,
      experience: '4+ years',
      verified: false,
      recentActivity: 'Helped with DevOps query',
      connections: 345,
    },
  ];

  const batches = ['all', '2016', '2017', '2018', '2019', '2020', '2021'];
  const companies = ['all', 'Google', 'Microsoft', 'Amazon', 'Netflix', 'Airbnb', 'TechFlow'];
  const domains = ['all', 'Software Engineering', 'Product Management', 'Data Science', 'Design', 'DevOps'];

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section id="alumni" className={`py-20 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Explore Alumni Network
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect with successful alumni working at top companies. Filter by batch, company, or domain to find your perfect mentors.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or skills..."
              className={`w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 focus:ring-4 transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-800 text-white placeholder-gray-400 focus:ring-blue-500/50' 
                  : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500/50'
              } shadow-lg`}
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Batch Year
              </label>
              <select
                value={selectedFilters.batch}
                onChange={(e) => handleFilterChange('batch', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch === 'all' ? 'All Batches' : `Batch ${batch}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Company
              </label>
              <select
                value={selectedFilters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'All Companies' : company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Domain
              </label>
              <select
                value={selectedFilters.domain}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain === 'all' ? 'All Domains' : domain}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumni.map((person) => (
            <div
              key={person.id}
              className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${
                darkMode ? 'bg-slate-800' : 'bg-white'
              } transform hover:-translate-y-2`}
            >
              {/* Header with gradient background */}
              <div className="relative h-24 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-xl"
                    />
                    {person.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      person.verified 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {person.verified ? 'Verified' : 'Member'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-16 p-6">
                <div className="mb-4">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {person.name}
                  </h3>
                  <p className={`text-lg font-semibold text-blue-600 mb-1`}>
                    {person.role}
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {person.company}
                    </span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Batch {person.batch}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {person.location}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {person.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          darkMode 
                            ? 'bg-slate-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {person.skills.length > 3 && (
                      <span className={`px-3 py-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        +{person.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatNumber(person.followers)}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {person.posts}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Posts
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {person.rating}★
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Rating
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`text-sm mb-6 p-3 rounded-xl ${
                  darkMode ? 'bg-slate-700' : 'bg-gray-50'
                }`}>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Recent: {person.recentActivity}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
                    Connect
                  </button>
                  <button className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                    darkMode 
                      ? 'border-slate-600 text-gray-300 hover:bg-slate-700' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}>
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  <button className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                    darkMode 
                      ? 'border-slate-600 text-gray-300 hover:bg-slate-700' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}>
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Load More Alumni
          </button>
        </div>
      </div>
    </section>
  );
}