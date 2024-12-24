// src/Pages/StartBidding/StartBidding.jsx
import React, { useState } from 'react';

const StartBidding = () => {
  const [bidAmount, setBidAmount] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
          <a href="/my-auctions" className="hover:text-gray-300">My Auctions</a>
          <a href="/view-listings" className="hover:text-gray-300">View Listings</a>
          <a href="/profile" className="hover:text-gray-300">Profile</a>
          <a href="/logout" className="hover:text-gray-300">Logout</a>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row mx-8 my-8 bg-white shadow-lg rounded-lg p-8">
        {/* Item Image and Description */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://via.placeholder.com/500" // Replace with actual item image
            alt="Auction Item"
            className="h-64 w-full object-cover rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-bold mt-6">Auction Item Title</h1>
          <p className="text-lg text-gray-700 mt-4">
            Detailed description of the auction item. This is where the user can get more information about the item’s
            condition, features, and other details.
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-4">Category: Electronics</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">Condition: New</p>
        </div>

        {/* Bidding Section */}
        <div className="md:w-1/2 p-4 bg-gray-100 rounded-lg">
          {/* Current Bid Details */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold">Current Highest Bid</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">$250</p>
            <p className="text-lg text-gray-700 mt-1">Starting Price: $200</p>
            <p className="text-lg text-gray-700 mt-1">Number of Bids: 5</p>
          </div>

          {/* Bid Input and Submit Button */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold">Place Your Bid</h2>
            <input
              type="number"
              placeholder="Enter bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full mt-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <button className="mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
              Submit Bid
            </button>
          </div>

          {/* Auction Countdown Timer */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center mb-6">
            <h2 className="text-2xl font-semibold">Time Remaining</h2>
            <p className="text-3xl font-bold text-red-500 mt-2">01h : 23m : 45s</p>
          </div>
        </div>
      </div>

      {/* Bidding History Section */}
      <div className="mx-8 my-8">
        <h2 className="text-2xl font-bold mb-4">Bidding History</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-lg">User</th>
                <th className="py-3 px-4 text-lg">Bid Amount</th>
                <th className="py-3 px-4 text-lg">Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with dynamic content */}
              <tr>
                <td className="py-3 px-4">JohnDoe</td>
                <td className="py-3 px-4">$250</td>
                <td className="py-3 px-4">2 minutes ago</td>
              </tr>
              <tr>
                <td className="py-3 px-4">JaneSmith</td>
                <td className="py-3 px-4">$230</td>
                <td className="py-3 px-4">5 minutes ago</td>
              </tr>
              <tr>
                <td className="py-3 px-4">AliceBrown</td>
                <td className="py-3 px-4">$220</td>
                <td className="py-3 px-4">10 minutes ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StartBidding;
