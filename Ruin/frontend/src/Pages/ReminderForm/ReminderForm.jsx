import React, { useState } from "react";

const ReminderForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    // Prepare request body
    const requestBody = {
      email: email,
      message: message,
    };

    try {
      // Make the API request
      const response = await fetch("http://localhost:5028/api/ReminderControllers/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Reminder sent successfully!");
      } else {
        setResponseMessage(data.message || "Failed to send reminder.");
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-500">Send Payment Reminder</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 text-gray-400 bg-white"
              placeholder="Enter recipient email"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 text-gray-400 bg-white"
              placeholder="Enter your reminder message"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reminder"}
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <div className={`mt-4 p-2 text-center ${responseMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderForm;
