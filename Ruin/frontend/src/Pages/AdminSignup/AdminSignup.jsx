import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const AdminSignup = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/AdminSignup`, {
        username: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
      });

      // Handle successful signup (e.g., redirect to login)
      console.log(response.data);
      alert('Signup successful! Please log in.');
      Navigate('/admin');
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-500">Admin Signup</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={signupData.fullName}
              onChange={handleChange}
              required
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              required
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              required
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mt-4 text-gray-400">
            <p>Already have an account? <Link to="/admin" className="text-blue-500 hover:underline">Log In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
