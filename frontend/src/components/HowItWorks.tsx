import React from 'react';
import { UserPlus, Users, BookOpen, MessageCircle, Award, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  darkMode: boolean;
}

export default function HowItWorks({ darkMode }: HowItWorksProps) {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up as a student or alumni and build your professional profile with your academic background and career details.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Users,
      title: 'Connect with Alumni',
      description: 'Discover alumni from your institution working in your field of interest and start meaningful conversations.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: BookOpen,
      title: 'Share Knowledge',
      description: 'Write blogs about your experiences, read insights from successful alumni, and stay updated with industry trends.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: MessageCircle,
      title: 'Ask & Answer',
      description: 'Get your career questions answered by experienced professionals and help other students with your expertise.',
      color: 'from-orange-500 to-red-600',
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Career Guidance',
      description: 'Get personalized advice from alumni who have walked your path',
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Build lasting connections with industry professionals',
    },
    {
      icon: BookOpen,
      title: 'Industry Insights',
      description: 'Stay updated with latest trends and opportunities',
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of students and alumni in our thriving community. Here's how you can get started and make the most of your experience.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Arrow between steps (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 z-10">
                    <ArrowRight className={`h-6 w-6 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                )}
                
                <div className={`relative p-8 rounded-2xl border transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 group-hover:border-slate-600' 
                    : 'bg-white border-gray-200 group-hover:border-gray-300'
                }`}>
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-r ${step.color}`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className={`p-8 rounded-3xl ${
          darkMode 
            ? 'bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100'
        }`}>
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Join Our Community?
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Unlock your potential with these exclusive benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  }`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {benefit.title}
                  </h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}