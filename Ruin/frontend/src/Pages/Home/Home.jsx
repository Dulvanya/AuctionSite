// src/Pages/Home/Home.jsx
import React from 'react';
import Navbar from '../../components/Navbar';
import auctionImage1 from '../../assets/images/auct1.jpg';
import auctionImage2 from '../../assets/images/auct2.jpg';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Full Screen Navbar Section */}
      <Navbar />

      {/* Full Screen Welcome Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-700 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Welcome to Ruin Betting!</h1>
          <p className="mt-6 text-2xl">Bet smart, bet safe. Enjoy a seamless betting experience.</p>
          <div className="mt-12 space-x-6">
            <button className="px-6 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500">Get Started</button>
            <button className="px-6 py-3 bg-transparent border border-white rounded hover:bg-white hover:text-black">Learn More</button>
          </div>
        </div>
      </div>

      {/* Smaller Auction Section */}
      <div className="h-1/2 flex flex-col items-center justify-center bg-gray-300 text-black p-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold">Discover Our Auctions</h2>
          <p className="mt-4 text-xl">Browse and participate in exciting auctions for a variety of items.</p>
        </div>
        <div className="flex flex-row space-x-4 justify-center items-center">
          {/* Card 1 */}
          <div className="card">
            <img src={auctionImage1} alt="Auction Item 1" className="h-48 w-full object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-2xl font-semibold">Home Items</h3>
              <p className="mt-2 text-lg">Discover a wide selection of furnishings, decor, and everyday essentials for creating a comfortable and stylish living space.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Bid Now</button>
            </div>
          </div>
          {/* Card 2 */}
          <div className="card">
            <img src={auctionImage2} alt="Auction Item 2" className="h-48 w-full object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-2xl font-semibold">Electronic Items</h3>
              <p className="mt-2 text-lg">Explore cutting-edge gadgets and electronics, from smartphones to home appliances, for all your tech needs.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Bid Now</button>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card">
            <img src={auctionImage1} alt="Auction Item 3" className="h-48 w-full object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-2xl font-semibold">Shop Items</h3>
              <p className="mt-2 text-lg">Browse a variety of products for your shop, including inventory, equipment, and supplies to support your business operations.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Bid Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Smaller Community Section */}
      <div className="h-[200px] flex items-center justify-center bg-gray-400 text-black p-6 flex-row">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Join Our Community</h2>
          <p className="mt-4 text-xl">Connect with other bidders and sellers, and make the most of your auction experience!</p>
          <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">Sign Up Now</button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-between">
            {/* Footer Left */}
            <div className="w-1/3">
              <h4 className="text-2xl font-semibold mb-4">About Us</h4>
              <p className="text-lg">Ruin Betting is your go-to platform for safe and exciting online auctions. Join us to discover a wide range of items and bid with confidence.</p>
            </div>
            
            {/* Footer Center */}
            <div className="w-1/3 text-center">
              <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Auctions</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
              </ul>
            </div>
            
            {/* Footer Right */}
            <div className="w-1/3 text-right">
              <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
              <div className="space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-500">Twitter</a>
                <a href="#" className="hover:text-pink-600">Instagram</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm">&copy; 2024 Ruin Betting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
