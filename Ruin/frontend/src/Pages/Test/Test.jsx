import React, { useState } from 'react';

const Test = () => {
  const [error, setError] = useState(''); // Initialize error state
  const [success, setSuccess] = useState(''); // Initialize success state

  const signupUser = async () => {
    try {
      // Change to HTTP for local testing
      const response = await fetch('http://localhost:5028/api/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'test',
          email: 'test@example.com',
          password: 'password123',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      setSuccess('Signup successful!'); // Set success message
      setError(''); // Clear any previous errors
    } catch (error) {
      // Error handling
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        setError(`Failed to register: ${error.response.data}`);
      } else if (error.request) {
        console.log(error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.log('Error:', error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button 
          onClick={signupUser} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Test;
