import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // useNavigate for programmatic navigation
import { usePropertyContext } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext"; 
import { FaBars, FaTimes, FaHeart, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();  // Hook for navigation after logout

  const { cart, likedProperties } = usePropertyContext();
  const likedCount = likedProperties.length;
  const cartCount = cart.length;

  const { auth, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Clear auth context and localStorage
    setIsProfileMenuOpen(false); // Close the profile dropdown menu
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-[#6E3640] text-white py-2 text-sm flex justify-between items-center px-8">
        <span>Affordable Rental Solutions</span>
        <span className="flex space-x-4 items-center">
          <button className="hover:underline" onClick={() => alert("Help section coming soon!")}>
            Need Help?
          </button>
          <select className="bg-[#6E3640] text-white border-none focus:ring-0 cursor-pointer">
            <option>KSH</option>
            <option>USD</option>
          </select>
          <select className="bg-[#6E3640] text-white border-none focus:ring-0 cursor-pointer">
            <option>English</option>
            <option>Kiswahili</option>
          </select>
        </span>
      </div>

      {/* Main Navigation */}
      <div className="bg-gray-100 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-[#6E3640] text-2xl font-bold">RENTIFy</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-maroon transition duration-300">New</Link>
            <Link to="/apartments" className="hover:text-maroon transition duration-300">Apartments</Link>
            <Link to="/houses" className="hover:text-maroon transition duration-300">Houses</Link>
            <Link to="/office-spaces" className="hover:text-maroon transition duration-300">Office Spaces</Link>
            <Link to="/discover" className="hover:text-maroon transition duration-300">Discover</Link>
            <Link to="/dashboard" className="hover:text-maroon transition duration-300">Dashboard</Link>
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-200 text-black rounded-full py-1 px-3 w-40 focus:outline-none focus:ring-2 focus:ring-maroon"
              />
            </div>

            {/* Liked Icon with Count */}
            <Link to="/liked" className="relative hover:text-maroon transition duration-300">
              <FaHeart />
              {likedCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {likedCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Count */}
            <Link to="/cart" className="relative hover:text-maroon transition duration-300">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Icon */}
            {auth ? (
              <div className="relative">
                <div
                  onClick={toggleProfileMenu}
                  className={`flex items-center space-x-2 cursor-pointer text-green-500`}
                >
                  <img
                    src={auth.user?.avatar || "path_to_default_avatar.jpg"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-maroon"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-maroon transition duration-300">
                <FaUser />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-l focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="bg-gray-100 md:hidden">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link to="/" className="hover:text-maroon transition duration-300" onClick={toggleMobileMenu}>New</Link>
              <Link to="/apartments" className="hover:text-maroon transition duration-300" onClick={toggleMobileMenu}>Apartments</Link>
              <Link to="/houses" className="hover:text-maroon transition duration-300" onClick={toggleMobileMenu}>Houses</Link>
              <Link to="/office-spaces" className="hover:text-maroon transition duration-300" onClick={toggleMobileMenu}>Office Spaces</Link>
              <Link to="/discover" className="hover:text-maroon transition duration-300" onClick={toggleMobileMenu}>Discover</Link>
              <Link to="/dashboard" className="hover:text-maroon transition duration-300" onClick={toggleMobileMenu}>Dashboard</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
