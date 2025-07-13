import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
     const response = await api.post('/users/login', { username: email, password });


      // Assuming backend returns user data on success
      const user = response.data;

      // Save user info in localStorage (simple auth management)
      localStorage.setItem("user", JSON.stringify({ id: response.data.user_id }));


      // Redirect to products page after login
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
  <h2 className="product-header">Login</h2>
  <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '1rem' }}>
      <label>Email:</label><br />
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input-field"
      />
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <label>Password:</label><br />
      <input
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input-field"
      />
    </div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <button type="submit" className="action-btn">Login</button>
  </form>
</div>

  );
};

export default Login;
