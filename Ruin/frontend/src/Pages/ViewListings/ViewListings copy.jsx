// src/Pages/ViewListings/ViewListings.jsx
import React from 'react';

const ViewListings = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">RUIN Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300 text-slate-100">Dashboard</a>
          <a href="/my-auctions" className="hover:text-gray-300 text-slate-100">My Auctions</a>
          <a href="/view-listings" className="hover:text-gray-300 text-slate-100">View Listings</a>
          <a href="/profile" className="hover:text-gray-300 text-slate-100">Profile</a>
          <a href="/logout" className="hover:text-gray-300 text-slate-100">Logout</a>
        </div>
      </nav>

      {/* Listings Header */}
      <div className="bg-white shadow-md rounded-lg p-8 my-8 mx-8">
        <h1 className="text-3xl font-bold">Browse Auction Listings</h1>
        <p className="text-lg text-gray-700 mt-2">
          Explore a variety of items available for auction. Place your bids and win exciting products!
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex justify-between items-center mx-8 my-4">
        <input
          type="text"
          placeholder="Search items..."
          className="p-4 rounded-lg border border-gray-300 w-1/2 shadow-md"
        />
        <div className="space-x-4">
          <select className="p-4 rounded-lg border border-gray-300 shadow-md">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Home Items</option>
            <option>Shop Items</option>
          </select>
          <select className="p-4 rounded-lg border border-gray-300 shadow-md">
            <option>All Statuses</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Upcoming</option>
          </select>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
            Filter
          </button>
        </div>
      </div>

      {/* Auction Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 my-4">
        {/* Sample Listing Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="https://via.placeholder.com/300" // Placeholder image
            alt="Auction Item"
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Auction Item 1</h3>
            <p className="mt-2 text-gray-600">A brief description of the item goes here.</p>
            <div className="mt-4">
              <span className="text-lg font-bold text-gray-800">Current Bid: $120</span>
              <span className="ml-4 text-sm text-gray-500">Time Left: 2h 15m</span>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              View Details
            </button>
          </div>
        </div>

        {/* Repeat Sample Listing Card for multiple items */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="https://via.placeholder.com/300" // Placeholder image
            alt="Auction Item"
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Auction Item 2</h3>
            <p className="mt-2 text-gray-600">A brief description of the item goes here.</p>
            <div className="mt-4">
              <span className="text-lg font-bold text-gray-800">Current Bid: $250</span>
              <span className="ml-4 text-sm text-gray-500">Time Left: 1d 4h</span>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              View Details
            </button>
          </div>
        </div>

        {/* Additional auction items can be added here similarly */}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center my-8">
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mx-2">Previous</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mx-2">1</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mx-2">2</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mx-2">Next</button>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; RUIN 2024 Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewListings;
