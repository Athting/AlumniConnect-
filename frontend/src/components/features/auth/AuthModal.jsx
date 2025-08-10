import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Modal, Input, Button } from "../../ui";
import {
  USER_ROLES,
  ACADEMIC_BRANCHES,
  BATCH_YEARS,
} from "../../../utils/constants";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../../utils/helpers";

const AuthModal = ({
  isOpen,
  onClose,
  darkMode,
  mode,
  onToggleMode,
  onAuth,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "student",
    batch: "",
    branch: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "register") {
      if (!validateRequired(formData.fullName)) {
        newErrors.fullName = "Full name is required";
      }
      if (!validateRequired(formData.confirmPassword)) {
        newErrors.confirmPassword = "Please confirm password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!validateRequired(formData.batch)) {
        newErrors.batch = "Batch is required";
      }
      if (!validateRequired(formData.branch)) {
        newErrors.branch = "Branch is required";
      }
      if (formData.role === "alumni" && !validateRequired(formData.company)) {
        newErrors.company = "Company is required for alumni";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        id: Date.now(),
        name: mode === "register" ? formData.fullName : "Demo User",
        email: formData.email,
        role: mode === "register" ? formData.role : "student",
        batch: mode === "register" ? formData.batch : "2020",
        branch: mode === "register" ? formData.branch : "Computer Science",
        company: formData.company || "Student",
      };

      onAuth(userData);
      onClose();
    } catch (error) {
      setErrors({ general: "Authentication failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "login" ? "Welcome Back" : "Join Alumni Connect"}
      darkMode={darkMode}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        {mode === "register" && (
          <>
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              error={errors.fullName}
              required
              darkMode={darkMode}
            />

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {USER_ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Batch <span className="text-red-500">*</span>
                </label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    darkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select Batch</option>
                  {BATCH_YEARS.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
                {errors.batch && (
                  <p className="text-red-500 text-sm mt-1">{errors.batch}</p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Branch <span className="text-red-500">*</span>
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    darkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select Branch</option>
                  {ACADEMIC_BRANCHES.map((branch) => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label}
                    </option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
                )}
              </div>
            </div>

            {formData.role === "alumni" && (
              <Input
                label="Company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                error={errors.company}
                required
                darkMode={darkMode}
              />
            )}
          </>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          error={errors.email}
          required
          darkMode={darkMode}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors.password}
            required
            darkMode={darkMode}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {mode === "register" && (
          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
            darkMode={darkMode}
          />
        )}

        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          className="w-full"
          size="lg"
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>

        <div className="text-center">
          <span
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AuthModal;
