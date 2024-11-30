import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill out all fields.");
      setShowModal(true);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { data } = res;

      if (res.status === 200) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", data.role);

        // Redirect based on user role
        if (data.role === "landlord") {
          navigate("/dashboard");
        } else {
          navigate("/"); // Redirect tenants to the home page or another appropriate page
        }
      } else {
        setErrorMessage(data.message || "Login failed.");
        setShowModal(true);
      }
    } catch (error) {
      const errorMsg =
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat font-montserrat"
      style={{ backgroundImage: "url(./images/assets/backgroundabout.png)" }}
    >
      <div className="bg-white bg-opacity-70 p-10 rounded-lg text-center w-full h-auto pt-32 pb-20">
        <h1 className="font-medium text-2xl text-primary mb-5">Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 my-3 border border-gray-300 rounded-md"
            onChange={handleChange}
          />
          <div className="w-full relative rounded-md">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 my-3 border border-gray-300 rounded-md"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            className="bg-[#570a28] text-white py-3 px-6 rounded-md cursor-pointer w-32 mx-auto mt-5 mb-5 hover:bg-[#570a26] transition-all"
            type="submit"
          >
            Log In →
          </button>
        </form>

        <div className="text-center font-bold">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className=" text-[#6E3640] text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 right-0 top-0 bottom-0 z-50 bg-black/25 flex items-center justify-center"
          >
            <motion.div
              initial={{ translateY: -400, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: -400, opacity: 0 }}
              className="relative bg-[#ECECEC] p-5 pt-8 rounded-xl w-64 max-w-[90%] flex justify-center items-center flex-col gap-4"
            >
              <FaTimes
                className="bg-gray-500 p-2 rounded-full text-4xl cursor-pointer text-white absolute -left-2 -top-2"
                onClick={() => setShowModal(false)}
              />
              <p className="font-serif text-lg text-center">{errorMessage}</p>
              <motion.div className="actions">
                <button
                  type="button"
                  className="bg-[#6E3640] py-2 px-4 text-white cursor-pointer rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
