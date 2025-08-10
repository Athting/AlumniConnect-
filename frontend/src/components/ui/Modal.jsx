import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  darkMode = false,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
}) => {
  const modalRef = useRef(null);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizes[size]} 
          ${darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"}
          rounded-xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100
          max-h-[90vh] overflow-hidden flex flex-col
          ${className}
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={`
            flex items-center justify-between p-6 border-b
            ${darkMode ? "border-slate-700" : "border-gray-200"}
          `}
          >
            {title && <h2 className="text-xl font-semibold">{title}</h2>}

            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  p-2 rounded-lg transition-colors
                  ${
                    darkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }
                `}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
