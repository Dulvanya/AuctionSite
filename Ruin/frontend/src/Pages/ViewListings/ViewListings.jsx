import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

// Define the calculateTimeLeft function
const calculateTimeLeft = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const timeDifference = end - start;

  // If timeDifference is negative, auction has ended
  if (timeDifference <= 0) {
    return 'Auction ended';
  }

  // Convert milliseconds into days, hours, minutes
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

  // Format output depending on the remaining time
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m left`;
  }
};

const ViewListings = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/AuctionItem`);
        setAuctionItems(response.data);
      } catch (error) {
        console.error('Error fetching auction items:', error);
      }
    };

    fetchAuctionItems();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleStatusChange = (e) => setSelectedStatus(e.target.value);

  const handleViewMore = (item) => {
    navigate(`/start-bidding/${item.id}`, { state: { item } });
  };

  const filteredItems = auctionItems
    .filter((item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    )
    .filter((item) =>
      selectedStatus ? item.status === selectedStatus : true
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">RUIN Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300 text-white">Dashboard</a>
          <a href="/my-auctions" className="hover:text-gray-300 text-white">My Auctions</a>
          <a href="/view-listings" className="hover:text-gray-300 text-white">View Listings</a>
          <a href="/profile" className="hover:text-gray-300 text-white">Profile</a>
          <a href="/logout" className="hover:text-gray-300 text-white">Logout</a>
        </div>
      </nav>

      {/* Search & Filter Bar */}
      <div className="flex justify-between items-center mx-8 my-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-4 rounded-lg border border-gray-300 w-1/2 shadow-md"
        />
        <div className="space-x-4">
          <select
            className="p-4 rounded-lg border border-gray-300 shadow-md"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="homeItems">Home Items</option>
            <option value="shopItems">Shop Items</option>
          </select>
          <select
            className="p-4 rounded-lg border border-gray-300 shadow-md"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md">
            Filter
          </button>
        </div>
      </div>

      {/* Auction Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 my-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={item.imageUrl || "https://via.placeholder.com/300"}
              alt={item.itemName}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.itemName}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-4">
                <span className="text-xl font-bold text-gray-800">Current Bid: ${item.startingBid}</span><br></br>
                <span className="text-sm text-gray-500">Time Left: {calculateTimeLeft(item.startDate, item.endDate)}</span>
              </div>
              <button
                onClick={() => handleViewMore(item)}
                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; RUIN 2024 Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewListings;
