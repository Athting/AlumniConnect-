// Navigation Links
export const NAV_LINKS = [
  { name: "Home", href: "/", icon: "Users" },
  { name: "Explore Alumni", href: "/alumni", icon: "Users" },
  { name: "Blogs", href: "/blogs", icon: "BookOpen" },
  { name: "Q&A Forum", href: "/qna", icon: "MessageCircle" },
];

// Hero Stats
export const HERO_STATS = [
  { icon: "Users", label: "Active Alumni", value: "2,500+" },
  { icon: "BookOpen", label: "Blog Posts", value: "1,200+" },
  { icon: "MessageCircle", label: "Q&A Threads", value: "850+" },
  { icon: "Star", label: "Success Stories", value: "400+" },
];

// How It Works Steps
export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Sign up and build your professional profile with your academic and career details.",
    icon: "UserPlus",
  },
  {
    step: 2,
    title: "Connect with Alumni",
    description:
      "Browse and connect with alumni from your institution across different batches and fields.",
    icon: "Users",
  },
  {
    step: 3,
    title: "Share & Learn",
    description:
      "Share your experiences through blogs and participate in Q&A discussions.",
    icon: "MessageCircle",
  },
  {
    step: 4,
    title: "Grow Together",
    description:
      "Collaborate on projects, find mentors, and contribute to the community.",
    icon: "TrendingUp",
  },
];

// User Roles
export const USER_ROLES = [
  { value: "student", label: "Current Student" },
  { value: "alumni", label: "Alumni" },
  { value: "faculty", label: "Faculty" },
];

// Academic Branches
export const ACADEMIC_BRANCHES = [
  { value: "cse", label: "Computer Science Engineering" },
  { value: "ece", label: "Electronics & Communication" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "ce", label: "Civil Engineering" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "it", label: "Information Technology" },
  { value: "other", label: "Other" },
];

// Batch Years (current year and past 20 years)
export const BATCH_YEARS = Array.from({ length: 21 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

// Featured Blog Categories
export const BLOG_CATEGORIES = [
  "Career Advice",
  "Technical Insights",
  "Industry Trends",
  "Academic Life",
  "Entrepreneurship",
  "Personal Growth",
];

// Testimonial Data
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    batch: "2019",
    content:
      "AlumniConnect helped me find my first job through a senior alumni mentor. The platform is amazing for networking!",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Data Scientist at Microsoft",
    batch: "2020",
    content:
      "The Q&A forum is incredibly helpful. I got answers to my technical questions from experienced alumni.",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Product Manager at Amazon",
    batch: "2018",
    content:
      "I love reading the career advice blogs here. They provided real insights into transitioning to product management.",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
];
