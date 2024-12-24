import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
  const [amount, setAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Function to handle amount input change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleApprove = (orderId) => {
    console.log("Order ID:", orderId);
    setPaymentSuccess(true);
  };

  const handleError = (err) => {
    console.error("Payment Error:", err);
    setPaymentError("Payment could not be completed. Please try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">Pay with PayPal</h2>

        {/* Input for amount */}
        <div className="text-center mb-4">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Enter the amount to pay:
          </label>
          <input
            type="number"
            step="0.01"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-2 text-lg text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* PayPal Button */}
        {amount > 0 ? (
          <PayPalScriptProvider
            options={{
              "client-id": "AR4aE2TlqMuLg7lwQo1btafUOHVmmx8GYQxfER-BtlTdM26f-HBNLo6UoMDHCjAz6rxqp8bIK09z3ZRe", // Replace with your actual client ID
              currency: "USD",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handleApprove(details.id);
                });
              }}
              onError={(err) => handleError(err)}
            />
          </PayPalScriptProvider>
        ) : (
          <p className="text-red-500 text-center">
            Please enter a valid amount.
          </p>
        )}

        {/* Show success message */}
        {paymentSuccess && (
          <div className="mt-4 p-2 text-center text-green-600">
            Payment successful! Thank you.
          </div>
        )}

        {/* Show error message */}
        {paymentError && (
          <div className="mt-4 p-2 text-center text-red-600">{paymentError}</div>
        )}
      </div>
    </div>
  );
};

export default PayPalPayment;
