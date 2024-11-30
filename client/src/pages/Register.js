import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('Tenant');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client', // Default to tenant
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setFormData((prevData) => ({
      ...prevData,
      role: tabName === 'Tenant' ? 'client' : 'landlord',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        (error.request ? 'Network error. Please check your connection.' : 'An error occurred.');
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div
      className="pt-14 pb-8 bg-cover bg-center font-montserrat"
      style={{ backgroundImage: 'url("/images/signup/signupBG.svg")' }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-0">
        <h2 className="text-black mb-6 text-center text-4xl">
          Sign Up For <span className="font-bold">Free</span>
        </h2>
        <div className="w-full">
          <div className="flex justify-center items-center">
            <div className="md:w-[30%] w-[60%] flex items-center py-1">
              <p
                className={`w-64 max-w-full py-2 border-2 flex items-center justify-center cursor-pointer font-medium ${
                  activeTab === 'Tenant' ? 'bg-[#6E3640] text-white' : ''
                }`}
                onClick={() => openTab('Tenant')}
              >
                Tenant
              </p>
              <p
                className={`w-64 max-w-full py-2 border-2 flex items-center justify-center cursor-pointer font-medium ${
                  activeTab === 'Landlord' ? 'bg-[#6E3640] text-white' : ''
                }`}
                onClick={() => openTab('Landlord')}
              >
                Landlord
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg mt-8">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button type="submit" className="bg-[#570a28] text-white py-3 px-6 rounded-md w-full mt-4">
              Sign Up →
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-[#6E3640] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
