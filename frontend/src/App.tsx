import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeaturedBlogs from './components/FeaturedBlogs';
import AlumniExplore from './components/AlumniExplore';
import QnAForum from './components/QnAForum';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  batch: string;
  branch: string;
  company: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleExplore = () => {
    document.getElementById('alumni')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality here
    alert(`Searching for: ${query}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-slate-900' : 'bg-white'
    }`}>
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        user={user}
      />

      {/* Hero Section */}
      <Hero 
        darkMode={darkMode}
        onExplore={handleExplore}
        onSearch={handleSearch}
      />

      {/* How It Works */}
      <HowItWorks darkMode={darkMode} />

      {/* Featured Blogs */}
      <FeaturedBlogs darkMode={darkMode} />

      {/* Alumni Explore */}
      <AlumniExplore darkMode={darkMode} />

      {/* Q&A Forum */}
      <QnAForum darkMode={darkMode} />

      {/* Testimonials */}
      <Testimonials darkMode={darkMode} />

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        darkMode={darkMode}
        mode={authMode}
        onToggleMode={toggleAuthMode}
        onAuth={handleAuth}
      />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150"
          style={{
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
          }}
        />
      </div>

      {/* Floating Action Button */}
      {isAuthenticated && (
        <button
          onClick={() => {
            setAuthMode('register');
            setIsAuthModalOpen(true);
          }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
          aria-label="Quick actions"
        >
          <span className="text-2xl">+</span>
        </button>
      )}
    </div>
  );
}

export default App;