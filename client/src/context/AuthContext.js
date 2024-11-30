import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const userData = { user: response.data.user, token: response.data.token };
      setAuth(userData);

      // Store user data in local storage
      localStorage.setItem("auth", JSON.stringify(userData));
      // Optionally set token in axios default headers for API calls
      axios.defaults.headers.Authorization = `Bearer ${userData.token}`;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    // Remove token from axios headers as well
    delete axios.defaults.headers.Authorization;
  };

  useEffect(() => {
    // Optionally, you can add a token refresh mechanism here if needed.
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
