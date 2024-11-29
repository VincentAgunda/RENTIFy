import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePropertyContext } from '../context/PropertyContext';
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";

// Mock Data
const mockHouses = [
  {
    _id: '1',
    title: 'Modern Apartment in City Center',
    location: 'New York, USA',
    price: '2500',
    rooms: 2,
    image: '/image/house1.jpg',
  },
  {
    _id: '2',
    title: 'Luxury Villa with Sea View',
    location: 'Malibu, CA',
    price: '8000',
    rooms: 5,
    image: '/image/house2.png',
  },
  {
    _id: '3',
    title: 'Cozy Cottage in the Countryside',
    location: 'Austin, TX',
    price: '1800',
    rooms: 3,
    image: '/image/house3.jpg',
  },
  {
    _id: '3',
    title: 'Cozy Cottage in the Countryside',
    location: 'Austin, TX',
    price: '1800',
    rooms: 3,
    image: '/image/house3.jpg',
  },
  {
    _id: '3',
    title: 'Cozy Cottage in the Countryside',
    location: 'Austin, TX',
    price: '1800',
    rooms: 3,
    image: '/image/house3.jpg',
  },
];

function Home() {
  const { addToCart, toggleLike } = usePropertyContext();
  const [featuredHouses, setFeaturedHouses] = useState([]);

  useEffect(() => {
    fetchFeaturedHouses();
  }, []);

  const fetchFeaturedHouses = async () => {
    try {
      const res = await axios.get('/api/houses?featured=true');
      setFeaturedHouses(res.data);
    } catch (error) {
      console.error('Error fetching featured houses:', error);
      setFeaturedHouses(mockHouses);
    }
  };

  return (
    <div className="bg-[#8ba89a] font-montserrat">
      {/* Hero Section */}
      <div
        className="h-[400px] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/homepage/hero-bg.jpg)' }}
      >
        <h1 className="text-[#1e293b] text-4xl font-bold mb-4">
          Find Your Perfect Home
        </h1>
        <p className="text-white font-medium text-l mb-8">
          Browse the best properties tailored to your needs.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#6E3640] flex items-center text-[#e5ecf4] py-3 px-6 rounded-md hover:bg-[#7f1d1d] transition-all">
            Browse Listings
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </button>
          <button className="bg-[#1e293b] text-[#e5ecf4] py-3 px-6 rounded-md hover:bg-gray-600 transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Render Search Section */}
      <SearchSection />

      {/* Featured Listings */}
      <FeaturedListings featuredHouses={featuredHouses} />

      {/* Testimonials Section */}
      <div className="py-10 bg-[#6e3640]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl text-white font-medium mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-900 italic">
                "This platform made finding my new home so easy and quick!"
              </p>
              <p className="font-semibold text-lg mt-4">Sarah W.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-900 italic">
                "Great user experience and excellent customer support!"
              </p>
              <p className="font-semibold text-lg mt-4">John D.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-900 italic">
                "Found my dream property here in no time!"
              </p>
              <p className="font-semibold text-lg mt-4">Michael R.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeaturedListings = ({ featuredHouses }) => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1e293b] text-center mb-8">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHouses.length > 0 ? (
            featuredHouses.map((house) => <HouseCard key={house._id} house={house} />)
          ) : (
            <p className="text-center col-span-3">No featured listings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const HouseCard = ({ house }) => {
  const { addToCart, toggleLike, cart, likedProperties } = usePropertyContext();

  const isLiked = likedProperties.some((item) => item._id === house._id);
  const isInCart = cart.some((item) => item._id === house._id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <img
        src={house.image}
        alt={house.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{house.title}</h3>
        <p className="text-gray-600">Location: {house.location}</p>
        <p className="text-gray-600">Price: ${house.price}</p>
        <p className="text-gray-600">Rooms: {house.rooms}</p>
      </div>

      {/* Like Button */}
      <div className="absolute top-4 left-4 flex items-center">
        <button
          onClick={() => toggleLike(house)}
          className={`text-[#6E3640] hover:text-opacity-80 transition-all ${
            isLiked ? 'text-red-500' : ''
          }`}
        >
          <FaRegHeart size={24} />
        </button>
        {isLiked && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-2 text-sm text-[#6E3640]"
          >
            Liked
          </motion.span>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="absolute top-4 right-4 flex items-center">
        <button
          onClick={() => addToCart(house)}
          className={`text-[#6E3640] hover:text-opacity-80 transition-all ${
            isInCart ? 'text-green-500' : ''
          }`}
        >
          <MdOutlineShoppingCart size={24} />
        </button>
        {isInCart && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-2 text-sm text-[#6E3640]"
          >
            In Cart
          </motion.span>
        )}
      </div>
    </div>
  );
}

function SearchSection() {
  const [propertyType, setPropertyType] = useState('rent');

  const handlePropertyTypeChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== 'rent') {
      alert("Currently, only 'Rent' is available.");
    }
    setPropertyType('rent');
  };

  return (
    <div className="py-8 bg-[#f2f4e4] shadow-md">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl text-[#1e293b] font-bold mb-4 text-center">
  Search Properties
</h2> {/* Closing h2 tag added here */}
<form className="flex flex-wrap gap-4 justify-center">
  <input
    type="text"
    placeholder="Where do you want to live?"
    className="p-3 border border-gray-300 rounded-md w-full max-w-sm"
  />
  <select
    className="p-3 border border-gray-300 rounded-md w-full max-w-xs"
    value={propertyType}
    onChange={handlePropertyTypeChange}
  >
    <option value="buy">Buy</option>
    <option value="rent">Rent</option>
    <option value="short-let">Short Let</option>
    <option value="land">Land</option>
  </select>
  {/* Bedroom dropdown */}
  <select className="p-3 border border-gray-300 rounded-md w-full max-w-xs">
    <option value="">Bed</option>
    {[...Array(10)].map((_, index) => (
      <option key={index} value={index + 1}>
        {`${index + 1} bedroom`}
      </option>
    ))}
  </select>
  {/* Price dropdowns */}
  <select className="p-3 border border-gray-300 rounded-md w-full max-w-xs">
    <option value="">Min Price</option>
    {Array.from({ length: 10 }, (_, index) => 10000 + index * 10000).map((price) => (
      <option key={price} value={price}>
        {`KSh ${price.toLocaleString()}`}
      </option>
    ))}
  </select>
  <select className="p-3 border border-gray-300 rounded-md w-full max-w-xs">
    <option value="">Max Price</option>
    {Array.from({ length: 10 }, (_, index) => 100000 + index * 50000).map((price) => (
      <option key={price} value={price}>
        {`KSh ${price.toLocaleString()}`}
      </option>
    ))}
  </select>
  <button
    type="submit"
    className="bg-[#6E3640] text-white py-3 px-6 rounded-md hover:bg-[#7f1d1d] transition-all"
  >
    Search
  </button>
</form>
</div>
</div>

  );
}

export default Home;

