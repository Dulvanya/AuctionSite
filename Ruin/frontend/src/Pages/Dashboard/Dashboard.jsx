// src/Pages/Dashboard/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">RUIN Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300 text-slate-100">Home</a>
          <a href="/my-auctions" className="hover:text-gray-300 text-slate-100">My Auctions</a>
          <a href="/profile" className="hover:text-gray-300 text-slate-100">Profile</a>
          <a href="/logout" className="hover:text-gray-300 text-slate-100">Logout</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        {/* Welcome Message */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold">Welcome to the Auction Management System!</h1>
          <p className="text-lg text-gray-700 mt-2">
            Manage your auctions, bids, and profile efficiently through our comprehensive platform.
          </p>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Auction Listings Widget */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Auction Listings</h2>
            <p className="text-gray-600 mt-2">
              Create, manage, and schedule auction listings with detailed descriptions and starting bids.
            </p>
            <Link to = "/view-listings">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Listings</button>
            </Link>
          </div>

          {/* Bidding System Widget */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Bidding System</h2>
            <p className="text-gray-600 mt-2">
              Participate in live auctions with real-time bid updates, countdown timers, and automatic bid increments.
            </p>
            <Link to = "/startbidding">
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Start Bidding</button>
            </Link>
          </div>

          {/* User Profiles & Authentication Widget */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">User Profiles & Authentication</h2>
            <p className="text-gray-600 mt-2">
              Manage user accounts, profile information, and roles for buyers, sellers, and administrators.
            </p>
            <Link to = "/profile">
                <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Manage Profiles</button>
            </Link>
          </div>

          {/* Payment Integration Widget */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Payment Integration</h2>
            <p className="text-gray-600 mt-2">
              Securely handle payments and transactions with integration to payment gateways like PayPal and Stripe.
            </p>
            <Link to = "/paypal">
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Configure Payment</button>
            </Link>
          </div>

          {/* Reporting & Analytics Widget 
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Reporting & Analytics</h2>
            <p className="text-gray-600 mt-2">
              Generate reports on auction performance, bidder activity, and revenue trends for better decision-making.
            </p>
            <Link to = "/reportinganalysis">
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">View Reports</button>
            </Link>
          </div>*/}

          {/* Email & Social Media Integration Widget 
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Email & Social Media Integration</h2>
            <p className="text-gray-600 mt-2">
              Manage email notifications and social media integrations to engage with your audience effectively.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Configure Integrations</button>
          </div>*/}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 RUIN Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
