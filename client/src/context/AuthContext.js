import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// Provide the AuthContext to children
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Retrieve user data from local storage on initialization
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  // Login function (example: using axios)
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const userData = { user: response.data.user, token: response.data.token };
      setAuth(userData);

      // Store user data in local storage for persistence
      localStorage.setItem("auth", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth"); // Clear local storage on logout
  };

  // Optional: Automatically refresh the auth state if needed
  useEffect(() => {
    // Example: You can add logic here to check token expiry and refresh tokens.
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export default (optional, for backward compatibility)
export default AuthContext;
