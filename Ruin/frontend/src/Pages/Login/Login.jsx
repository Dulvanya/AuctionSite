import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1]; // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5028';
      const response = await axios.post(`${baseURL}/api/login`, loginData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const token = response.data.token;

      console.log(token); // Check if token is returned

      if (!token) {
        throw new Error("Token not received from API.");
      }
      
      localStorage.setItem('authToken', token);

      //const jwt_decode = await import('jwt-decode').then(module => module.default);

      // Decode the token to get user details (like user ID)
      const decodedToken = decodeJWT(token);
      const userId = decodedToken.userId; // Assuming the token has `userId`

      localStorage.setItem('userId', userId);

      console.log(userId);

      // On successful login, store the auth token in localStorage
      //localStorage.setItem('authToken', response.data.token); // Adjust based on your API response

      setSuccess('Login successful!');
      setError('');

      // Redirect to the Dashboard
      navigate('/dashboard');

    } catch (error) {
      if (error.response) {
        setError(`Login failed: ${error.response.data}`);
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Login to Your Account</h2>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-100"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-100"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>

          <div className="text-sm text-center text-black">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
