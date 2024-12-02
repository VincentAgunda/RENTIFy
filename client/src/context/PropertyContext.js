import React, { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);

  const addToCart = (house) => {
    setCart((prevCart) =>
      !prevCart.some((item) => item._id === house._id) ? [...prevCart, house] : prevCart
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const toggleLike = (house) => {
    setLikedProperties((prevLikes) =>
      prevLikes.some((item) => item._id === house._id)
        ? prevLikes.filter((item) => item._id !== house._id)
        : [...prevLikes, house]
    );
  };

  return (
    <PropertyContext.Provider value={{ cart, likedProperties, addToCart, removeFromCart, toggleLike }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);
