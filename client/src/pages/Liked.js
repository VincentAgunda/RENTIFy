import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { FaThumbsDown } from 'react-icons/fa'; // Import FaThumbsDown for Dislike

const Liked = () => {
  const { likedProperties, toggleLike } = usePropertyContext();

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50 font-montserrat">
      <h1 className="text-3xl font-bold text-center mb-6">Liked Properties</h1>
      <div className="max-w-6xl mx-auto mb-auto">
        {likedProperties.length === 0 ? (
          <p className="text-center">No liked properties yet.</p>
        ) : (
          <div className="space-y-6">
            {likedProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
              >
                <div className="flex gap-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{property.title}</h2>
                    <p className="text-gray-600">Location: {property.location}</p>
                    <p className="text-gray-600">Price: Ksh{property.price}</p>
                    <p className="text-gray-600">Rooms: {property.rooms}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    className="bg-[#b91c1c] text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                    onClick={() => toggleLike(property)}
                  >
                    <FaThumbsDown size={20} /> {/* Using FaThumbsDown for Dislike */}
                  </button>
                  <button
                    className="bg-[#316286] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                  >
                    Connect to Property Owner
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

export default Liked;
