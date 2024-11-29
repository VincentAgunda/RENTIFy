import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Liked from "./pages/Liked";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PropertyProvider } from "./context/PropertyContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app or the part that needs auth context */}
      <PropertyProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/liked" element={<Liked />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;
