import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };
};

export default useAuth;
