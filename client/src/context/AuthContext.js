import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Set the base URL for Axios
axios.defaults.baseURL = "https://rentify-uxmp.onrender.com";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  useEffect(() => {
    if (auth?.token) {
      // Set default Authorization header if token is available
      axios.defaults.headers.Authorization = `Bearer ${auth.token}`;
    }
  }, [auth]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/users/login", { email, password });
      const userData = { user: response.data.user, token: response.data.token };
      setAuth(userData);

      // Store user data in local storage
      localStorage.setItem("auth", JSON.stringify(userData));

      // Set token in axios default headers for API calls
      axios.defaults.headers.Authorization = `Bearer ${userData.token}`;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "An error occurred during login.");
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");

    // Remove token from axios headers as well
    delete axios.defaults.headers.Authorization;
  };

  // Add Axios interceptor for handling token expiration
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized errors (e.g., token expiration)
          console.error("Token expired or unauthorized. Logging out...");
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when component unmounts
    return () => axios.interceptors.response.eject(interceptor);
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
