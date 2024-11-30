import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Liked from "./pages/Liked";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ConnectPage from "./pages/ConnectPage"; // New import
import Apartments from "./pages/Apartments"; // Added Apartments route
import Houses from "./pages/Houses"; // Added Houses route
import OfficeSpaces from "./pages/OfficeSpaces"; // Added OfficeSpaces route
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PropertyProvider } from "./context/PropertyContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
            <Route path="/connect/:propertyId" element={<ConnectPage />} /> {/* New route */}
            <Route path="/apartments" element={<Apartments />} /> {/* Apartments page */}
            <Route path="/houses" element={<Houses />} /> {/* Houses page */}
            <Route path="/office-spaces" element={<OfficeSpaces />} /> {/* OfficeSpaces page */}
          </Routes>
          <Footer />
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;
