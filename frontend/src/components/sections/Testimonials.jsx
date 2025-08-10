import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Card, Button } from "../ui";
import { TESTIMONIALS } from "../../utils/constants";

const Testimonials = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extended testimonials with more details
  const testimonials = [
    {
      id: 1,
      name: "Raj Patel",
      role: "Software Engineer at Google",
      batch: "2020",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      content:
        "AlumniConnect was instrumental in my career journey. The mentorship I received from senior alumni helped me crack Google interviews. The platform connects you with the right people at the right time.",
      rating: 5,
      company: "Google",
      achievement: "Landed dream job at Google",
    },
    {
      id: 2,
      name: "Sneha Sharma",
      role: "Product Manager at Microsoft",
      batch: "2019",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      content:
        "The blog section is a goldmine of career advice. I learned about product management through detailed posts by alumni already working in the field. It gave me clarity on my career path.",
      rating: 5,
      company: "Microsoft",
      achievement: "Successfully transitioned to Product Management",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      role: "Data Scientist at Netflix",
      batch: "2018",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      content:
        "The Q&A forum saved me countless hours of research. Getting answers from alumni who have been through similar experiences is invaluable. I got my Netflix offer with guidance from this platform.",
      rating: 5,
      company: "Netflix",
      achievement: "Secured position at Netflix",
    },
    ...TESTIMONIALS.map((t) => ({
      ...t,
      rating: 5,
      achievement: "Career Success",
    })),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide(
      currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <section className={`py-20 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Success Stories
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Hear from alumni who leveraged our platform to accelerate their
            careers and achieve their dreams.
          </p>
        </div>

        {/* Main Testimonial Slider */}
        <div className="relative">
          <Card
            darkMode={darkMode}
            className="p-8 md:p-12 max-w-4xl mx-auto text-center mb-8 overflow-hidden"
            hover={false}
          >
            {/* Quote Icon */}
            <Quote
              className={`h-12 w-12 mx-auto mb-6 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />

            {/* Testimonial Content */}
            <blockquote
              className={`text-xl md:text-2xl leading-relaxed mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              "{testimonials[currentSlide].content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={testimonials[currentSlide].avatar}
                alt={testimonials[currentSlide].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-center md:text-left">
                <h4
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {testimonials[currentSlide].name}
                </h4>
                <p
                  className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}
                >
                  {testimonials[currentSlide].role}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Batch of {testimonials[currentSlide].batch}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center mt-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            onClick={goToPrevious}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-600"
            } shadow-lg hover:shadow-xl`}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            onClick={goToNext}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-600"
            } shadow-lg hover:shadow-xl`}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? darkMode
                    ? "bg-blue-400"
                    : "bg-blue-600"
                  : darkMode
                  ? "bg-slate-600"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              95%
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Success Rate
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              500+
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Success Stories
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              4.9★
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              10k+
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Happy Users
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
