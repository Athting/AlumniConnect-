import React from "react";

const Card = ({
  children,
  className = "",
  darkMode = false,
  hover = true,
  padding = true,
  ...props
}) => {
  const baseClasses = `
    rounded-xl border transition-all duration-300
    ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}
    ${hover ? "hover:shadow-lg hover:-translate-y-1" : ""}
    ${padding ? "p-6" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
