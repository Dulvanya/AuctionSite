import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaDollarSign, FaClock } from 'react-icons/fa';

const baseURL = import.meta.env.VITE_API_URL;

const MyAuctions = () => {
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyBids = async () => {
      const userId = localStorage.getItem('userId'); // Fetch logged-in user ID
      const authToken = localStorage.getItem('authToken'); // Fetch auth token for protected API

      if (!userId || !authToken) {
        setError('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/Bid/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setMyBids(response.data); // Set the bidding data
        } else {
          setError('Failed to load bidding history.');
        }
      } catch (error) {
        console.error('Error fetching my bids:', error);
        setError('An error occurred while fetching bidding history.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  if (loading) {
    return <p>Loading your bids...</p>;
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

      {/* Main Content Section */}
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-500">My Auctions</h1>

        {myBids.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myBids.map((bid, index) => (
              <div key={index} className="bg-white shadow-lg rounded-xl p-6 transition transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <FaUser className="text-blue-600 text-3xl" />
                  <h2 className="text-xl font-semibold text-gray-400">Username: {bid.user.username}</h2>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <FaDollarSign className="text-green-600 text-2xl" />
                  <p className="text-lg font-bold text-gray-800">Your Bid: ${bid.amount}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaClock className="text-gray-500 text-2xl" />
                  <p className="text-sm text-gray-600">Placed on: {new Date(bid.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">You have not placed any bids yet.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MyAuctions;
