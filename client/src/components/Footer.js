import React from "react";

function Footer() {
  return (
    <footer className="bg-[#282828] text-white py-8 font-montserrat">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* RENTIFy Info Section */}
          <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
            <h3 className="text-lg font-bold mb-2">RENTIFy</h3>
            <p className="text-center sm:text-left">
              Find your dream home or list <br></br> your property with ease.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul>
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-bold mb-2">Follow Us</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="text-center mt-6 text-sm">
          © 2024 RENTIFy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
