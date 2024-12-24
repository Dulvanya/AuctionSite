/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import ViewListings from './Pages/ViewListings/ViewListings';
import StartBidding from './Pages/StartBidding/StartBidding';
import ManageProfiles from './Pages/ManageProfiles/ManageProfiles';
import ReportingAnalytics from './Pages/ReportingAnalytics/ReportingAnalytics';
import AddAuctionItem from './Pages/AddAuctionItem/AddAuctionItem';
import Test from './Pages/Test/Test'
import ProtectedRoute from './components/ProtectedRoute';
import MyAuctions from './Pages/MyAuctions/MyAuctions';
import AdminSignup from './Pages/AdminSignup/AdminSignup';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import ReminderForm from './Pages/ReminderForm/ReminderForm';
import PayPalPayment from './Pages/PayPalPayment/PayPalPayment';

const App = () => {
  return (
    <Router>
      {/* Main Container for All Routes */}
      <div>
        {/* Define Routes */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>} />
          <Route path="/view-listings" element={
            <ProtectedRoute>
              <ViewListings />
            </ProtectedRoute>} />
            
          <Route path="/start-bidding/:id" element={
            <ProtectedRoute>
              <StartBidding />
            </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>
            <ManageProfiles />
          </ProtectedRoute>} />
          <Route path="/reportinganalysis" element={<ReportingAnalytics />} />
          <Route path="/addauctionitem" element={<AddAuctionItem />} />
          <Route path="/test" element={<Test />} />
          <Route path="/my-auctions" element={
            <ProtectedRoute>
              <MyAuctions />
            </ProtectedRoute>} />
          <Route path = "/admin" element = {<AdminLogin/>}/>
          <Route path = "/admin-signup" element = {<AdminSignup/>}/>
          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>} />
          
            <Route path="/send-reminders" element={
            <ProtectedRoute>
              <ReminderForm />
            </ProtectedRoute>} />
            <Route path = "/paypal" element={<PayPalPayment/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;