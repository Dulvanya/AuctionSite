import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL; // Assuming API URL is in environment variables

const AdminLogin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' }); // Updated to username
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        adminId: 0,  // Set this to 0 or to a relevant value
        username: loginData.username, // Adjust field to lowercase to match the backend
        password: loginData.password,
        email: "user@example.com", // Include email field (default or fetch from form if needed)
        createdDate: new Date().toISOString() // Include current timestamp
      };
  
      //console.log(formattedData);
      const response = await axios.post(`${baseURL}/api/AdminLogin`, formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const token = "fake-jwt-token"; // Get this token from the actual response if using JWT
        localStorage.setItem('token', token); // Save the token to localStorage
  
        alert('Login successful!');
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      }
      // Handle success (e.g., save token, redirect to dashboard)
      //console.log(response.data); // Log the response for now
      //alert('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-500">Admin Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4 text-gray-500">
            <p>Don't have an account? <Link to="/admin-signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
