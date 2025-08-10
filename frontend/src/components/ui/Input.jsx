import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      disabled = false,
      error,
      helpText,
      required = false,
      darkMode = false,
      icon: Icon,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputClasses = `
    w-full px-4 py-3 rounded-lg border transition-colors duration-200 
    ${Icon ? "pl-11" : "pl-4"} 
    ${
      darkMode
        ? "bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
    }
    ${
      error
        ? darkMode
          ? "border-red-400 focus:border-red-400 focus:ring-red-400"
          : "border-red-500 focus:border-red-500 focus:ring-red-500"
        : ""
    }
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    focus:outline-none focus:ring-2 focus:ring-offset-0
    ${className}
  `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className="space-y-1">
        {label && (
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                className={`h-5 w-5 ${
                  darkMode ? "text-slate-400" : "text-gray-400"
                }`}
              />
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={inputClasses}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        {helpText && !error && (
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
