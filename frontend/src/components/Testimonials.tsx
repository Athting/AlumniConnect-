import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialsProps {
  darkMode: boolean;
}

export default function Testimonials({ darkMode }: TestimonialsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Raj Patel',
      role: 'Software Engineer at Google',
      batch: '2020',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'AlumniConnect was instrumental in my career journey. The mentorship I received from senior alumni helped me crack Google interviews. The platform connects you with the right people at the right time.',
      rating: 5,
      company: 'Google',
      achievement: 'Landed dream job at Google',
    },
    {
      id: 2,
      name: 'Sneha Sharma',
      role: 'Product Manager at Microsoft',
      batch: '2019',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The blog section is a goldmine of career advice. I learned about product management through detailed posts by alumni already working in the field. It gave me clarity on my career path.',
      rating: 5,
      company: 'Microsoft',
      achievement: 'Successfully transitioned to Product Management',
    },
    {
      id: 3,
      name: 'Arjun Kumar',
      role: 'Data Scientist at Netflix',
      batch: '2018',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The Q&A forum saved me countless hours of research. Getting answers from alumni who have been through similar experiences is invaluable. I got my Netflix offer with guidance from this platform.',
      rating: 5,
      company: 'Netflix',
      achievement: 'Secured position at Netflix',
    },
    {
      id: 4,
      name: 'Priya Mehta',
      role: 'UX Designer at Airbnb',
      batch: '2021',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'As a design student, finding mentors was challenging. AlumniConnect helped me connect with designers at top companies. Their portfolio reviews and interview tips were incredibly helpful.',
      rating: 5,
      company: 'Airbnb',
      achievement: 'Built strong design portfolio with mentorship',
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Startup Founder',
      batch: '2017',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The entrepreneurship insights shared by alumni who started their own companies were eye-opening. I learned about fundraising, team building, and market validation through real experiences shared here.',
      rating: 5,
      company: 'TechStart',
      achievement: 'Successfully launched startup with $2M funding',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Success Stories
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Hear from alumni who leveraged our platform to accelerate their careers and achieve their dreams.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className={`mx-4 p-8 lg:p-12 rounded-3xl ${
                    darkMode ? 'bg-slate-800' : 'bg-white'
                  } shadow-2xl`}>
                    <div className="max-w-4xl mx-auto">
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <Quote className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className={`text-xl lg:text-2xl font-medium text-center mb-8 leading-relaxed ${
                        darkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        "{testimonial.content}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center justify-center space-x-6">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover shadow-lg"
                        />
                        <div className="text-center">
                          <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {testimonial.name}
                          </h4>
                          <p className={`text-lg font-semibold text-blue-600 mb-1`}>
                            {testimonial.role}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Batch {testimonial.batch} • {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Achievement Badge */}
                      <div className="flex justify-center mt-6">
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                          darkMode 
                            ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          🎉 {testimonial.achievement}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              darkMode 
                ? 'bg-slate-700 text-white hover:bg-slate-600 shadow-2xl' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-xl'
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              darkMode 
                ? 'bg-slate-700 text-white hover:bg-slate-600 shadow-2xl' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-xl'
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 w-8'
                  : darkMode
                  ? 'bg-slate-600 hover:bg-slate-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium ${
            darkMode 
              ? 'bg-slate-800 text-gray-300 border border-slate-700' 
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Join {testimonials.length}+ successful alumni stories</span>
          </div>
        </div>
      </div>
    </section>
  );
}