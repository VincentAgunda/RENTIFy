import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaTrash } from 'react-icons/fa';

function Dashboard() {
  const [houses, setHouses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    others: '',
    description: '',
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Configure Axios globally
  axios.defaults.baseURL = 'https://rentify-uxmp.onrender.com'; // Updated base URL
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price || !formData.bedrooms || !formData.bathrooms || formData.images.length === 0) {
      setErrorMessage('Please fill out all required fields and upload at least one image.');
      return;
    }

    try {
      const formDataWithImages = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'images') {
          formData.images.forEach((image) => formDataWithImages.append('images', image));
        } else {
          formDataWithImages.append(key, formData[key]);
        }
      });

      const response = await axios.post('/api/houses', formDataWithImages);
      console.log('House created successfully:', response.data);

      setFormData({
        name: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        others: '',
        description: '',
        images: [],
      });
      setErrorMessage('');
      fetchHouses();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setErrorMessage('Error creating house listing.');
    }
  };

  const fetchHouses = async () => {
    try {
      const res = await axios.get('/api/houses');
      if (Array.isArray(res.data)) {
        setHouses(res.data);
      } else {
        console.error('Fetched data is not an array:', res.data);
        setErrorMessage('Unexpected data format.');
      }
    } catch (error) {
      console.error('Error fetching houses:', error);
      setErrorMessage('Error fetching house listings.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this house?')) return;

    try {
      await axios.delete(`/api/houses/${id}`);
      fetchHouses();
    } catch (error) {
      console.error('Error deleting house listing:', error);
      setErrorMessage('Error deleting house listing.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchHouses();
    } else {
      setErrorMessage('You must be logged in to view listings.');
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10">My Dashboard</h1>

      {/* Stats Section */}
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

      {/* Create Listing Form */}
      <h2 className="text-2xl font-semibold mb-4">Create a New House Listing</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
        <input type="text" name="name" placeholder="House Name" value={formData.name} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <input type="text" name="others" placeholder="Other Rooms (optional)" value={formData.others} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white"></textarea>
        <input type="file" name="images" multiple onChange={handleImageChange} className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white" />
        <button type="submit" className="bg-red-600 text-white py-3 px-6 rounded-md mt-4 w-full">Add House</button>
        {errorMessage && <p className="text-red-400 text-sm mt-2">{errorMessage}</p>}
      </form>

      {/* Houses List */}
      <h2 className="text-2xl font-semibold mb-4">Your Houses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {houses.length > 0 ? (
          houses.map((house) => (
            <div key={house._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">{house.name}</h3>
              <p>Location: {house.location}</p>
              <p>Price: Ksh {house.price}</p>
              <p>Bedrooms: {house.bedrooms}</p>
              <p>Bathrooms: {house.bathrooms}</p>
              <p>Other Rooms: {house.others}</p>
              {house.images.map((img, idx) => (
                <img key={idx} src={`https://rentify-uxmp.onrender.com/uploads/${img}`} alt="House" className="w-full h-32 object-cover mt-4 rounded-lg" />
              ))}
              <button onClick={() => handleDelete(house._id)} className="bg-red-600 text-white py-2 px-4 rounded mt-4 flex items-center">
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          ))
        ) : (
          <p>No houses available to display</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
