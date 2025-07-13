import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const userId = userStr ? JSON.parse(userStr).id : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
  <div className="brand">Shopping Cart</div>
  <div className="user-info">
    {userId ? (
      <>
        Hello, User {userId} |
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <Link to="/login" style={{ color: 'white' }}>Login</Link>
    )}
  </div>
</nav>

  );
};

export default Navbar;
