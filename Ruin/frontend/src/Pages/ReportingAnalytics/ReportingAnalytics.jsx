// src/Pages/ReportingAnalytics/ReportingAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically import Chart.js

const ReportingAnalytics = () => {
  // State for example data
  const [auctionData, setAuctionData] = useState({
    totalAuctions: 100,
    activeUsers: 150,
    totalRevenue: 50000,
    topCategories: {
      electronics: 35,
      homeItems: 25,
      collectibles: 40,
    },
  });

  // Chart data configuration
  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [12000, 15000, 18000, 20000, 25000, 27000, 30000],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Home Items', 'Collectibles'],
    datasets: [
      {
        data: [auctionData.topCategories.electronics, auctionData.topCategories.homeItems, auctionData.topCategories.collectibles],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const auctionPerformanceData = {
    labels: ['Auction 1', 'Auction 2', 'Auction 3', 'Auction 4', 'Auction 5'],
    datasets: [
      {
        label: 'Bids Received',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [35, 25, 40, 20, 50],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300 text-white">Dashboard</a>
          <a href="/manage-profiles" className="hover:text-gray-300 text-white">Manage Profiles</a>
          <a href="/view-listings" className="hover:text-gray-300 text-white">View Listings</a>
          <a href="/logout" className="hover:text-gray-300 text-white">Logout</a>
        </div>
      </nav>

      {/* Reporting & Analytics Section */}
      <div className="flex flex-col items-center py-12 px-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-500">Reporting & Analytics</h1>
        <p className="text-lg text-gray-700 mb-12">Get insights into the auction performance, bidder activities, and revenue trends.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Total Auctions</h2>
            <p className="text-4xl font-bold text-blue-500 mt-4">{auctionData.totalAuctions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Active Users</h2>
            <p className="text-4xl font-bold text-green-500 mt-4">{auctionData.activeUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Total Revenue</h2>
            <p className="text-4xl font-bold text-red-500 mt-4">${auctionData.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Revenue Line Chart */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Monthly Revenue Trends</h2>
          <Line data={revenueData} />
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Top Auction Categories</h2>
          <Pie data={categoryData} />
        </div>

        {/* Auction Performance Bar Chart */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Auction Performance (Bids Received)</h2>
          <Bar data={auctionPerformanceData} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReportingAnalytics;
