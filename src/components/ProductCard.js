import React from 'react';
import api from '../api';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please login first');
      return;
    }

    const user = JSON.parse(userStr);

    api.post('/cart/add', {
      user_id: user.id,
      item_id: product.id,
      quantity: 1,
    })
    .then(() => alert('Added to cart'))
    .catch(err => {
      console.error(err);
      alert('Failed to add to cart');
    });
  };

  return (
    <>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </>
  );
};

export default ProductCard;
