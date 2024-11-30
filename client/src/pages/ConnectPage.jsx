import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConnectPage = () => {
  const { id } = useParams(); // Get the property ID from the URL

  return (
    <motion.div
      className="min-h-screen bg-[#f2f4e4] flex items-center justify-center px-4"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Connect with the Property Owner
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Message to Owner
            </label>
            <textarea
              placeholder="Write your message here"
              className="w-full p-3 border rounded-md"
              rows="5"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#316286] text-white py-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ConnectPage;
