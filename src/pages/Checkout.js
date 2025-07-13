import React from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    const userId = Number(user.id); // ensure it's a number

    api.post('/checkout', { user_id: userId })
      .then(res => {
        alert('Order placed successfully');
        navigate('/orders');
      })
      .catch(err => {
        if (err.response) {
          alert(`Checkout failed: ${err.response.data.error || 'Server error'}`);
          console.error('Backend error:', err.response.data);
        } else {
          alert('Checkout failed: Network or unknown error');
          console.error(err);
        }
      });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
