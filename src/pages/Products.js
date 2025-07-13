import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const userId = userStr ? JSON.parse(userStr).id : null;

  useEffect(() => {
    api.get('/items')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch items', err));
  }, []);

  const handleCheckout = () => {
    if (!userStr) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    api.post('/checkout', { user_id: Number(userId) })
      .then(() => {
        alert('Order placed successfully');
        navigate('/orders');
      })
      .catch(err => {
        alert(`Checkout failed: ${err.response?.data?.error || 'Error'}`);
        console.error(err);
      });
  };

  const handleShowCart = () => {
    if (!userId) {
      alert('Please login first');
      return;
    }
    api.get(`/cart/${userId}`)
      .then(res => {
        const cartItems = res.data.map(i => `${i.item.name} (x${i.quantity})`).join(', ');
        alert(`Cart items:\n${cartItems || 'Cart is empty'}`);
      })
      .catch(() => alert('Failed to fetch cart'));
  };

  const handleShowOrders = () => {
    if (!userId) {
      alert('Please login first');
      return;
    }
    api.get(`/orders/${userId}`)
      .then(res => {
        const orderIds = res.data.map(order => order.id).join(', ');
        alert(`Order history:\n${orderIds || 'No orders found'}`);
      })
      .catch(() => alert('Failed to fetch orders'));
  };

  return (
    <div className="container">
  <h2 className="product-header1">All Products</h2>

  <div className="action-buttons">
    <button onClick={handleCheckout} className="action-btn">Checkout</button>
    <button onClick={handleShowCart} className="action-btn">Cart</button>
    <button onClick={handleShowOrders} className="action-btn">Order History</button>
  </div>

  <div className="product-grid">
    {products.map(item => (
      <div key={item.id} className="product-card">
        <ProductCard product={item} />
      </div>
    ))}
  </div>
</div>

  );
};

export default Products;
