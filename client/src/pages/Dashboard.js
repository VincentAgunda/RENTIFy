import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaTrash } from 'react-icons/fa'; // Removed FaMoneyCheck for total balance

function Dashboard() {
  const [houses, setHouses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Configure axios headers globally
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    try {
      // Create FormData instance to append form data (including images)
      const formDataWithImages = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'images') {
          formData.images.forEach((image) => formDataWithImages.append('images', image));
        } else {
          formDataWithImages.append(key, formData[key]);
        }
      });

      console.log('Form data being sent:', formDataWithImages);  // Log form data being sent

      const response = await axios.post('http://localhost:5000/api/houses', formDataWithImages);

      console.log('House created successfully:', response);  // Log response after posting

      setFormData({ name: '', location: '', price: '', description: '', images: [] });
      fetchHouses();
      setErrorMessage('');
    } catch (error) {
      console.error('Error in handleSubmit:', error);  // Log error
      setErrorMessage('Error creating house listing.');
    }
  };

  const fetchHouses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/houses');
      setHouses(res.data);
      console.log('Fetched houses:', res.data);  // Log fetched houses
    } catch (error) {
      console.error('Error fetching houses:', error);  // Log error
      setErrorMessage('Error fetching house listings.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this house?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/houses/${id}`);
      fetchHouses();
    } catch (error) {
      setErrorMessage('Error deleting house listing.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchHouses();
    } else {
      setErrorMessage('You must be logged in to view listings.');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10">My Dashboard</h1>

      {/* Revenue & Stats (Removed Total Balance) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaHome size={40} />
          <div>
            <h3 className="text-lg font-bold">Listed Houses</h3>
            <p className="text-2xl font-semibold">{houses.length}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <FaPlusCircle size={40} />
          <div>
            <h3 className="text-lg font-bold">New Listings</h3>
            <p className="text-2xl font-semibold">Add Now</p>
          </div>
        </div>
      </div>

      {/* Add House Form */}
      <h2 className="text-2xl font-semibold mb-4">Create a New House Listing</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
        <input
          type="text"
          name="name"
          placeholder="House Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-700 text-white"
        ></textarea>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
        <button type="submit" className="bg-[#6E3640] text-white py-3 px-6 rounded-md mt-4 w-full">
          Add House
        </button>
        {errorMessage && <p className="text-red-400 text-sm mt-2">{errorMessage}</p>}
      </form>

      {/* Houses List */}
      <h2 className="text-2xl font-semibold mb-4">Your Houses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {houses.map((house) => (
          <div key={house._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">{house.name}</h3>
            <p>Location: {house.location}</p>
            <p>Price: ${house.price}</p>
            <p>Description: {house.description}</p>
            {house.images.map((img, idx) => (
              <img key={idx} src={img} alt="House" className="w-full h-32 object-cover mt-4 rounded-lg" />
            ))}
            <button
              onClick={() => handleDelete(house._id)}
              className="bg-red-600 text-white py-2 px-4 rounded mt-4"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
