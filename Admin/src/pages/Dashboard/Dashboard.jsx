import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1>Welcome to the Tomato Admin Panel</h1>
      <p>Manage your restaurant, track orders, and add new menu items with ease.</p>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>150</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h3>25</h3>
          <p>Menu Items</p>
        </div>
        <div className="stat-card">
          <h3>$4,250</h3>
          <p>Revenue This Month</p>
        </div>
        <div className="stat-card">
          <h3>8</h3>
          <p>Pending Deliveries</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;