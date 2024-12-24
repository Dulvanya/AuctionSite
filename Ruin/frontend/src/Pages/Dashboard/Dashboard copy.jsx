// src/Pages/Dashboard/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          Auction Dashboard
        </div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:underline">Home</a>
          <a href="/my-auctions" className="hover:underline">My Auctions</a>
          <a href="/profile" className="hover:underline">Profile</a>
          <a href="/logout" className="hover:underline">Logout</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Welcome Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-4xl font-semibold mb-4">Welcome Back!</h1>
          <p className="text-lg text-gray-600">
            Glad to have you on board. Start participating in auctions, view your active bids, or manage your profile settings.
          </p>
        </div>

        {/* Dashboard Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Auctions Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Active Auctions</h2>
            <p className="text-gray-600">
              Explore ongoing auctions and place your bids on items of interest.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Auctions</button>
          </div>

          {/* My Bids Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">My Bids</h2>
            <p className="text-gray-600">
              Keep track of your bids and see if you are the highest bidder.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">View My Bids</button>
          </div>

          {/* Account Settings Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <p className="text-gray-600">
              Manage your account details, update your profile, and configure your preferences.
            </p>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Manage Account</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 Auction Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
