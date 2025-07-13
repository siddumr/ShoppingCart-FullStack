import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);

    api.get(`/orders/${user.id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [navigate]);

  return (
    <div className="container">
      <h2 className="product-header1">Order History</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#ccc' }}>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-container">
              <h3>Order #{order.id}</h3>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
