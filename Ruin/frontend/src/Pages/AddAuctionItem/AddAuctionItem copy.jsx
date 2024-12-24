// src/Pages/AddAuctionItem/AddAuctionItem.jsx
import React, { useState } from 'react';

const AddAuctionItem = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    startingBid: '',
    startDate: '',
    endDate: '',
    image: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the form data to backend (e.g., API call)
    console.log('Auction item submitted:', formData);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      itemName: '',
      description: '',
      category: '',
      startingBid: '',
      startDate: '',
      endDate: '',
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">RUIN Auction Management System</div>
        <div className="space-x-6">
          <a href="/dashboard" className="hover:text-gray-300 text-slate-100">Dashboard</a>
          <a href="/view-listings" className="hover:text-gray-300 text-slate-100">View Listings</a>
          <a href="/reporting-analytics" className="hover:text-gray-300 text-slate-100">Reporting & Analytics</a>
          <a href="/logout" className="hover:text-gray-300 text-slate-100">Logout</a>
        </div>
      </nav>

      {/* Add Auction Item Section */}
      <div className="flex flex-col items-center py-12 px-8">
        <h1 className="text-4xl font-bold mb-6 text-black">Add New Auction Item</h1>
        <p className="text-lg text-gray-700 mb-12">Fill in the details below to list a new item for auction.</p>

        {/* Auction Item Form */}
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Item Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500  bg-slate-100 text-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-100 text-black"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-100 text-black"
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="homeItems">Home Items</option>
                <option value="collectibles">Collectibles</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>

            {/* Starting Bid */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Starting Bid ($)</label>
              <input
                type="number"
                name="startingBid"
                value={formData.startingBid}
                onChange={handleChange}
                min="1"
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-100 text-black"
              />
            </div>

            {/* Auction Start Date */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-100 text-black"
              />
            </div>

            {/* Auction End Date */}
            <div>
              <label className="block text-lg font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-100 text-black"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Item Image Url</label>
              <input
                type="text"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-slate-100 text-black"
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-gray-300 text-black rounded hover:bg-gray-400 focus:outline-none"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 Auction Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AddAuctionItem;
