import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const ConnectPage = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !phone || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    // Prepare the data for EmailJS
    const templateParams = {
      from_name: name,
      reply_to: email,
      phone_number: phone, // Include phone number
      message,
      property_id: id,
    };

    emailjs
      .send(
        'service_b9pxdi5',
        'template_kymnkhf',
        templateParams,
        'pFIz_y45-U5I7CtV3'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setStatus('Your message has been sent successfully! We will contact you shortly.');
          setName('');
          setEmail('');
          setPhone(''); // Clear phone number field
          setMessage('');
        },
        (error) => {
          console.error('FAILED...', error);
          setStatus('Something went wrong. Please try again.');
        }
      );
  };

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

        {status && (
          <p
            className={`text-center mb-4 ${
              status.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              name="from_name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              name="reply_to"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Your Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Message to Owner</label>
            <textarea
              name="message"
              placeholder="Write your message here, e.g. 'Hi, I’m interested in the two-bedroom property. Is it still available?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-md"
              rows="5"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6E3640] text-white py-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ConnectPage;
