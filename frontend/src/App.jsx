import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/layout";
import { Home, Alumni, Blogs, QnA } from "./pages";
import { AuthModal } from "./components/features/auth";
import { useDarkMode, useAuth } from "./hooks";

function AppContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const handleAuth = (userData) => {
    login(userData);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search functionality here
    alert(`Searching for: ${query}`);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-slate-900" : "bg-white"
      }`}
    >
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={logout}
        user={user}
      />

      {/* Main Content */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home darkMode={darkMode} onSearch={handleSearch} />}
          />
          <Route path="/alumni" element={<Alumni darkMode={darkMode} />} />
          <Route path="/blogs" element={<Blogs darkMode={darkMode} />} />
          <Route path="/qna" element={<QnA darkMode={darkMode} />} />
        </Routes>
      </main>

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
            width: `${
              (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
              100
            }%`,
          }}
        />
      </div>

      {/* Floating Action Button */}
      {isAuthenticated && (
        <button
          onClick={() => {
            setAuthMode("register");
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
