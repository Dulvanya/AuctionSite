import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ruin Auction Management System</h1>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline text-white hover:text-amber-400">Home</a></li>
            <li><a href="/auctions" className="hover:underline text-white hover:text-amber-400">Auctions</a></li>
            <li><a href="/bids" className="hover:underline text-white hover:text-amber-400">Bids</a></li>
            <li><a href="/profile" className="hover:underline text-white hover:text-amber-400">Profile</a></li>
            <li><a href="/logout" className="hover:underline text-white hover:text-amber-400">Logout</a></li>
          </ul>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center">Welcome to the Admin Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600 text-center">This page is protected and only accessible by logged-in admins.</p>

        {/* Cards Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Total Auctions */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold">Total Auctions</h2>
            <p className="mt-4 text-3xl font-semibold">120</p>
            <p className="mt-2 text-sm">Current active auctions in the system</p>
          </div>

          {/* Card 2: Active Bids */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold">Active Bids</h2>
            <p className="mt-4 text-3xl font-semibold">450</p>
            <p className="mt-2 text-sm">Number of bids placed by users</p>
          </div>

          {/* Card 3: Registered Users */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold">Registered Users</h2>
            <p className="mt-4 text-3xl font-semibold">320</p>
            <p className="mt-2 text-sm">Total users registered on the platform</p>
          </div>

          {/* Card 4: Report Analysis */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600">Report Analysis</h2>
            <p className="mt-4 text-gray-600">Analyze auction performance, bid trends, and more.</p>
            <a href="/reportinganalysis" className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Generate Report</a>
          </div>

          {/* Card 5: Add Item */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600">Add Item</h2>
            <p className="mt-4 text-gray-600">Add new items for upcoming auctions.</p>
            <a href="/addauctionitem" className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Add New Item</a>
          </div>

          {/* Card 6: Send Reminders */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600">Send Reminders</h2>
            <p className="mt-4 text-gray-600">Send reminders to users about upcoming auctions.</p>
            <a href="/send-reminders" className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Send Reminder</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;