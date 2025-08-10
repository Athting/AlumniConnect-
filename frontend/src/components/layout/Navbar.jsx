import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  User,
  BookOpen,
  MessageCircle,
  Users,
} from "lucide-react";
import { Button } from "../ui";
import { NAV_LINKS } from "../../utils/constants";

const Navbar = ({
  darkMode,
  toggleDarkMode,
  isAuthenticated,
  onLogin,
  onRegister,
  onLogout,
  user,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const iconMap = {
    Users,
    BookOpen,
    MessageCircle,
    Search,
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        darkMode
          ? "bg-slate-900/95 backdrop-blur-md border-slate-800"
          : "bg-white/95 backdrop-blur-md border-gray-200"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span
              className={`font-bold text-xl ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              AlumniConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? darkMode
                        ? "text-blue-400 bg-slate-800"
                        : "text-blue-600 bg-blue-50"
                      : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "text-gray-300 hover:text-white hover:bg-slate-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Authentication buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Welcome, {user?.name} ({user?.role})
                </div>
                <Button onClick={onLogout} size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onLogin}
                  className={
                    darkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-800"
                      : ""
                  }
                  size="sm"
                >
                  Login
                </Button>
                <Button onClick={onRegister} size="sm">
                  Register
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkMode
                  ? "text-gray-300 hover:text-white hover:bg-slate-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden py-4 border-t ${
              darkMode ? "border-slate-800" : "border-gray-200"
            }`}
          >
            <div className="space-y-2">
              {NAV_LINKS.map((link) => {
                const Icon = iconMap[link.icon];
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? darkMode
                          ? "text-blue-400 bg-slate-800"
                          : "text-blue-600 bg-blue-50"
                        : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-slate-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {!isAuthenticated && (
                <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-slate-800">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onLogin();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      onRegister();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
