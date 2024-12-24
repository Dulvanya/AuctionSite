import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const StartBidding = () => {
  const { state } = useLocation();
  const { item } = state || {}; // Get the item data passed from ViewListings

  const [bidAmount, setBidAmount] = useState('');
  const [biddingHistory, setBiddingHistory] = useState([]); // For displaying bidding history
  const [message, setMessage] = useState(''); // For feedback messages
  const [currentBid, setCurrentBid] = useState(item?.currentBid || item?.startingBid);
  const [numBids, setNumBids] = useState(item?.numBids || 0);

  // Fetch bidding history and current highest bid from backend
  useEffect(() => {
    const fetchBiddingData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${baseURL}/api/Bid/auction/${item.id}`);
          const bids = response.data;

          console.log(bids); 

          setBiddingHistory(
            bids.map((bid) => ({
              user: bid.user.username, // Adjust based on your backend data
              amount: bid.amount,
              time: new Date(bid.timestamp).toLocaleString(),
            }))
          );

          // Update current highest bid and number of bids
          if (bids.length > 0) {
            const highestBid = Math.max(...bids.map((bid) => bid.amount));
            setCurrentBid(highestBid);
            setNumBids(bids.length);
          }
        }
      } catch (error) {
        console.error('Error fetching bidding data:', error);
        setMessage('Error fetching bidding data.');
      }
    };

    fetchBiddingData();
  }, [item]);

  // Handle bid submission
  // Handle bid submission
  const handleBidSubmit = async () => {
    const parsedBidAmount = parseFloat(bidAmount);
    if (!bidAmount || parsedBidAmount <= currentBid) {
      setMessage('Please enter a valid bid higher than the current bid.');
      return;
    }

    const userId = localStorage.getItem('userId'); // Get the logged-in user ID from localStorage
    const authToken = localStorage.getItem('authToken'); // Get the authentication token

    if (!userId || !authToken) {
      setMessage('User is not authenticated. Please log in.');
      return;
    }

    try {
      // Fetch user data from the backend
      const userResponse = await axios.get(`${baseURL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Pass the auth token in the header
          'Content-Type': 'application/json',
        },
      });

      const user = userResponse.data; // Get user data from response

      // Prepare bid data to match the Bid model in C#
      const bidData = {
        AuctionItemId: item.id, // Ensure this matches the backend API
        UserId: userId, // Use fetched UserId
        Amount: parsedBidAmount,
        TransactionId: 'string', // Replace with actual transaction ID from payment gateway if necessary
      };

      // Update logging statements to use the correct variable names
      console.log('AuctionItemId:', bidData.AuctionItemId);
      console.log('UserId:', bidData.UserId);
      console.log('Amount:', bidData.Amount);
      console.log('TransactionId:', bidData.TransactionId);

      // Send the bid to the backend
      const response = await axios.post(`${baseURL}/api/Bid`, bidData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setMessage('Bid submitted successfully!');
        // Update bidding history with the new bid
        const newBid = {
          user: 'You',
          amount: parsedBidAmount,
          time: 'Just now',
        };
        setBiddingHistory([newBid, ...biddingHistory]);
        setCurrentBid(parsedBidAmount);
        setNumBids(numBids + 1);
        setBidAmount(''); // Reset the bid input
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.details || error.response.data?.message || 'Failed to submit bid. Please try again.';
        setMessage(errorMessage);
        console.error('Error submitting bid:', error.response.data);
      } else {
        setMessage('Failed to submit bid. Please try again.');
        console.error('Error submitting bid:', error);
      }
    }
  };


  if (!item) {
    return <p>Loading item details...</p>; // Handle the case when item is not passed correctly
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
      <div className="flex flex-col md:flex-row mx-8 my-8 bg-white shadow-lg rounded-lg p-8">
        {/* Item Image and Description */}
        <div className="md:w-1/2 p-4">
          <img
            src={item.imageUrl || "https://via.placeholder.com/500"} // Use actual item image
            alt={item.itemName}
            className="h-64 w-full object-cover rounded-lg shadow-md"
          />
          <h1 className="text-3xl font-bold mt-6">{item.itemName}</h1>
          <p className="text-lg text-gray-700 mt-4">{item.description}</p>
          <p className="text-lg font-semibold text-gray-800 mt-4">Category: {item.category}</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">Condition: {item.condition || 'N/A'}</p>
        </div>

        {/* Bidding Section */}
        <div className="md:w-1/2 p-4 bg-gray-100 rounded-lg">
          {/* Current Bid Details */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-600">Current Highest Bid</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">${currentBid}</p>
            <p className="text-lg text-gray-700 mt-1">Starting Price: ${item.startingBid}</p>
            <p className="text-lg text-gray-700 mt-1">Number of Bids: {numBids}</p>
          </div>

          {/* Bid Input and Submit Button */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-400">Place Your Bid</h2>
            <input
              type="number"
              placeholder="Enter bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full mt-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            />
            <button
              onClick={handleBidSubmit}
              className="mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
            >
              Submit Bid
            </button>

            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>

          {/* Bidding History Section */}
          <div className="mx-8 my-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-600">Bidding History</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              {biddingHistory.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-3 px-4 text-lg text-gray-500">User</th>
                      <th className="py-3 px-4 text-lg text-gray-500">Bid Amount</th>
                      <th className="py-3 px-4 text-lg text-gray-500">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biddingHistory.map((bid, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 text-gray-500">{bid.user}</td>
                        <td className="py-3 px-4 text-gray-500">${bid.amount}</td>
                        <td className="py-3 px-4 text-gray-500">{bid.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No bids have been placed yet.</p>
              )}
            </div>
          </div>
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
