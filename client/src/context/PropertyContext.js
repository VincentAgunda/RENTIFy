import React, { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);

  // Add item to cart
  const addToCart = (house) => {
    setCart((prevCart) => {
      if (!prevCart.some((item) => item._id === house._id)) {
        return [...prevCart, house];
      }
      return prevCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Toggle like/unlike property
  const toggleLike = (house) => {
    setLikedProperties((prevLikes) => {
      if (prevLikes.some((item) => item._id === house._id)) {
        return prevLikes.filter((item) => item._id !== house._id);
      }
      return [...prevLikes, house];
    });
  };

  return (
    <PropertyContext.Provider
      value={{
        cart,
        likedProperties,
        addToCart,
        removeFromCart,
        toggleLike,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);
