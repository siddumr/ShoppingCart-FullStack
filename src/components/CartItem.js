import React from 'react';

const CartItem = ({ item, onRemove }) => {
  if (!item || !item.item) return null; // Skip rendering if bad data

  const total = item.item.price * item.quantity;

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '0.5rem', width: '400px' }}>
      <h4>{item.item.name}</h4>
      <p>Quantity: {item.quantity}</p>
      <p>Price per item: ₹{item.item.price}</p>
      <p><strong>Total: ₹{total}</strong></p>
      <button onClick={() => onRemove(item.id)} style={{ marginTop: '0.5rem' }}>
        Remove
      </button>
    </div>
  );
};



export default CartItem;