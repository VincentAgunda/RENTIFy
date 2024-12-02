import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../context/PropertyContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart } = usePropertyContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-50 font-montserrat">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="max-w-6xl mx-auto">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full sm:w-32 h-40 object-cover rounded-lg"
                  />
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold">{property.title}</h2>
                    <p className="text-gray-600">Location: {property.location}</p>
                    <p className="text-gray-600">Price: KSh {property.price}</p>
                    <p className="text-gray-600">Rooms: {property.rooms}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="flex items-center gap-2 bg-[#6E3640] text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                    onClick={() => removeFromCart(property._id)}
                  >
                    <FaTrash size={20} />
                    <span>Remove</span>
                  </button>
                  <button
                    className="bg-[#1e293b] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                    onClick={() => navigate(`/connect/${property._id}`)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
