import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  MessageCircle,
  Users,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { Card, Badge, Button, Input } from "../ui";

const AlumniExplore = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "Software Engineering",
    "Product Management",
    "Data Science",
    "Design",
    "Entrepreneurship",
  ];

  const alumni = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      batch: "2019",
      branch: "Computer Science",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      rating: 4.9,
      mentees: 45,
      expertise: ["React", "Node.js", "System Design", "Leadership"],
      bio: "Passionate about building scalable web applications and mentoring aspiring developers.",
      verified: true,
      social: {
        linkedin: "rajesh-kumar",
        github: "rajeshkumar",
        twitter: "rajesh_dev",
      },
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      batch: "2018",
      branch: "Computer Science",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      rating: 4.8,
      mentees: 32,
      expertise: [
        "Product Strategy",
        "User Research",
        "Data Analysis",
        "Leadership",
      ],
      bio: "Helping build products that impact millions of users. Love mentoring new PMs.",
      verified: true,
      social: {
        linkedin: "priya-sharma-pm",
        twitter: "priya_pm",
      },
    },
    {
      id: 3,
      name: "Arjun Patel",
      role: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      batch: "2020",
      branch: "Statistics",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      rating: 4.9,
      mentees: 28,
      expertise: ["Machine Learning", "Python", "Statistics", "Deep Learning"],
      bio: "ML engineer working on recommendation systems. Happy to help with data science career.",
      verified: true,
      social: {
        linkedin: "arjun-patel-ds",
        github: "arjunpatel",
      },
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "UX Designer",
      company: "Airbnb",
      location: "San Francisco, CA",
      batch: "2021",
      branch: "Design",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      rating: 4.7,
      mentees: 18,
      expertise: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
      bio: "Passionate about creating delightful user experiences. Open to design mentorship.",
      verified: true,
      social: {
        linkedin: "sneha-reddy-ux",
      },
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Startup Founder",
      company: "TechStart Inc.",
      location: "Bangalore, India",
      batch: "2017",
      branch: "Computer Science",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      rating: 4.8,
      mentees: 52,
      expertise: [
        "Entrepreneurship",
        "Fundraising",
        "Team Building",
        "Strategy",
      ],
      bio: "Founded multiple startups. Happy to share insights on entrepreneurship journey.",
      verified: true,
      social: {
        linkedin: "vikram-singh-founder",
        twitter: "vikram_startup",
      },
    },
    {
      id: 6,
      name: "Anita Gupta",
      role: "Marketing Director",
      company: "Meta",
      location: "Menlo Park, CA",
      batch: "2019",
      branch: "Business Administration",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      rating: 4.6,
      mentees: 24,
      expertise: [
        "Digital Marketing",
        "Brand Strategy",
        "Growth Hacking",
        "Analytics",
      ],
      bio: "Marketing professional with expertise in digital growth strategies.",
      verified: true,
      social: {
        linkedin: "anita-gupta-marketing",
      },
    },
  ];

  const filteredAlumni = alumni.filter((alumnus) => {
    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumnus.expertise.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "All" ||
      alumnus.role.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      alumnus.expertise.some((skill) =>
        skill.toLowerCase().includes(selectedFilter.toLowerCase())
      );

    return matchesSearch && matchesFilter;
  });

  return (
    <section
      id="alumni"
      className={`py-20 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Explore Alumni Network
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Connect with successful alumni from your institution. Get
            mentorship, career advice, and industry insights.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, company, role, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                darkMode={darkMode}
                className="w-full"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="transition-all"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAlumni.map((alumnus) => (
            <Card
              key={alumnus.id}
              darkMode={darkMode}
              className="overflow-hidden group"
            >
              <div className="relative p-6">
                {alumnus.verified && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="success" size="sm">
                      <Star className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <img
                    src={alumnus.avatar}
                    alt={alumnus.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {alumnus.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    } font-medium`}
                  >
                    {alumnus.role}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {alumnus.company}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div
                    className={`flex items-center text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {alumnus.location}
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                    {alumnus.branch} • Batch {alumnus.batch}
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    {alumnus.mentees} mentees
                  </div>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {alumnus.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-6">
                  {alumnus.expertise.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {alumnus.expertise.length > 3 && (
                    <Badge variant="default" size="sm">
                      +{alumnus.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span
                      className={`text-sm ml-1 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {alumnus.rating} rating
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    {alumnus.social.linkedin && (
                      <Button variant="ghost" size="sm" className="p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    )}
                    {alumnus.social.github && (
                      <Button variant="ghost" size="sm" className="p-2">
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                    {alumnus.social.twitter && (
                      <Button variant="ghost" size="sm" className="p-2">
                        <Twitter className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Alumni
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              2,500+
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Alumni Network
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
              Companies
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              50+
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Countries
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              10,000+
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Connections Made
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlumniExplore;
