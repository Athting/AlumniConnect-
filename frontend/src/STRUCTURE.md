# AlumniConnect Frontend - Redesigned Structure

This document describes the new, organized file structure for the AlumniConnect frontend application.

## 📁 New File Structure

```
frontend/src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx         # Customizable button component
│   │   ├── Input.jsx          # Form input component with validation
│   │   ├── Modal.jsx          # Modal wrapper component
│   │   ├── Card.jsx           # Card container component
│   │   ├── Badge.jsx          # Badge/tag component
│   │   └── index.js           # UI components exports
│   ├── layout/                # Layout components
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Footer component
│   │   └── index.js           # Layout exports
│   ├── sections/              # Page sections
│   │   ├── Hero.jsx           # Hero/landing section
│   │   ├── HowItWorks.jsx     # How it works section
│   │   ├── Testimonials.jsx   # Testimonials carousel
│   │   └── index.js           # Section exports
│   └── features/              # Feature-specific components
│       └── auth/              # Authentication feature
│           ├── AuthModal.jsx  # Login/Register modal
│           └── index.js       # Auth exports
├── hooks/                     # Custom React hooks
│   ├── useAuth.js            # Authentication state management
│   ├── useDarkMode.js        # Dark mode toggle logic
│   └── useLocalStorage.js    # LocalStorage persistence
├── utils/                     # Utility functions and constants
│   ├── constants.js          # Application constants
│   └── helpers.js            # Helper functions
├── App.jsx                   # Main application component
└── main.jsx                  # Application entry point
```

## 🎯 Key Improvements

### 1. **Reusable UI Components**

- **Button**: Configurable with variants (primary, secondary, outline, etc.)
- **Input**: Form input with built-in validation and error states
- **Modal**: Reusable modal wrapper with backdrop and escape handling
- **Card**: Container component with hover effects and dark mode support
- **Badge**: Tag/label component with color variants

### 2. **Custom Hooks**

- **useAuth**: Manages authentication state and localStorage persistence
- **useDarkMode**: Handles dark mode toggle and DOM class management
- **useLocalStorage**: Generic hook for localStorage operations

### 3. **Organized Structure**

- **components/ui/**: Base UI components used throughout the app
- **components/layout/**: Layout-specific components (Navbar, Footer)
- **components/sections/**: Page sections (Hero, HowItWorks, etc.)
- **components/features/**: Feature-specific components grouped by domain

### 4. **Utility Functions**

- **constants.js**: Centralized configuration and data
- **helpers.js**: Utility functions for validation, formatting, etc.

## 🔧 Component Usage Examples

### Button Component

```jsx
import { Button } from './components/ui';

// Primary button
<Button onClick={handleClick}>Primary Button</Button>

// Secondary button with icon
<Button variant="secondary" size="lg">
  <Icon className="mr-2" />
  Secondary
</Button>

// Loading state
<Button loading={isLoading}>Submit</Button>
```

### Input Component

```jsx
import { Input } from "./components/ui";

<Input
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}
  required
  darkMode={darkMode}
/>;
```

### Custom Hooks

```jsx
import { useAuth, useDarkMode } from "./hooks";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Component logic here
}
```

## 📋 Migration Benefits

1. **Better Code Organization**: Components are logically grouped by purpose
2. **Reusability**: UI components can be used across different parts of the app
3. **Maintainability**: Easier to find and modify specific functionality
4. **Consistency**: Unified design system through reusable components
5. **Performance**: Custom hooks prevent unnecessary re-renders
6. **Developer Experience**: Clear import paths and component structure

## 🚀 Getting Started

The redesigned structure maintains the exact same visual design while improving code organization. All existing functionality has been preserved and enhanced with:

- Better separation of concerns
- Reusable components
- Custom hooks for state management
- Centralized constants and utilities
- Clean import/export structure

## 📦 Component Dependencies

- **UI Components**: Independent, can be used anywhere
- **Layout Components**: Use UI components for consistency
- **Section Components**: Use UI components and constants
- **Feature Components**: Use UI components and hooks
- **Hooks**: Can be used by any component
- **Utils**: Used throughout the application

This structure provides a solid foundation for scaling the application while maintaining clean, readable, and maintainable code.
