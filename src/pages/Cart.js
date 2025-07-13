import React, { useEffect, useState } from 'react';
import api from '../api';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

 const fetchCart = async () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    alert('Please login first');
    navigate('/login');
    return;
  }

  const user = JSON.parse(userStr);
  try {
    const res = await api.get(`/cart/${user.id}`);
    console.log('Fetched Cart Items:', res.data);
    setCartItems(Array.isArray(res.data) ? [...res.data] : []);

  } catch (err) {
    console.error('Error fetching cart:', err);
  }
};


  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/cart/remove/${itemId}`);
      alert('Item removed from cart');
      fetchCart();
    } catch (err) {
      alert('Failed to remove');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
   <div>
    <h1>Your Cart</h1>

    {cartItems.length === 0 ? (
      <p style={{color: 'red'}}>Cart is empty (Length = 0)</p>
    ) : (
      cartItems.map(item => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))
    )}
  </div>
  );
};

export default Cart;
