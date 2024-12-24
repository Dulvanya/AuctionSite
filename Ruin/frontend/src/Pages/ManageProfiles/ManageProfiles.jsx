import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const ManageProfiles = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const [loading, setLoading] = useState(true); // Loading state for the profile fetch
  const [error, setError] = useState(''); // Error state to display any issues during fetch or update

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Replace this with proper user fetching logic
      const authToken = localStorage.getItem('authToken');

      if (!userId || !authToken) {
        setError('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const userData = response.data;

        // Assuming the user data includes fullName, email, phone, and role
        setProfile({
          fullName: userData.username || '', // Assuming username corresponds to the full name
          email: userData.email || '',
          phone: userData.phone || '+1 234 567 890', // Update this based on your backend model
          role: userData.role || 'Bidder', // Defaulting to 'Bidder' if role is not provided
          password: '', // Password should not be pre-filled
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user profile.');
      } finally {
        setLoading(false); // Stop the loading state once the API call is complete
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem('userId'); // Same userId logic
    const authToken = localStorage.getItem('authToken');

    try {
      // Sending PUT request to update user profile
      const updatedProfile = {
        userId:userId,
        username: profile.fullName, // Assuming the API expects 'username' not 'fullName'
        email: profile.email,
        password: profile.password,
      };
      await axios.put(`${baseURL}/api/users/${userId}`, updatedProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300 text-white">Dashboard</a>
          <a href="/my-auctions" className="hover:text-gray-300 text-white">My Auctions</a>
          <a href="/view-listings" className="hover:text-gray-300 text-white">View Listings</a>
          <a href="/profile" className="hover:text-gray-300 text-white">Profile</a>
          <a href="/logout" className="hover:text-gray-300 text-white">Logout</a>
        </div>
      </nav>

      {/* Profile Management Section */}
      <div className="flex justify-center items-center my-12">
        <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-lg">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <img
              src="https://cdn.dropp.cloud/4twuqi.jpg"
              alt="User Profile"
              className="w-32 h-32 rounded-full mx-auto bg-gray-300"
            />
            <h1 className="text-3xl font-bold mt-4">{profile.fullName}</h1>
            <p className="text-lg text-gray-700">{profile.role}</p>
          </div>

          {/* User Information Form */}
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
              >
                <option value="Bidder">Bidder</option>
                <option value="Seller">Seller</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Change Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg"
              />
            </div>

            {/* Save Changes Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Danger Zone for Account Deletion */}
          {/* ... Additional sections if needed ... */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 RUIN Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManageProfiles;
