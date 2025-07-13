import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      await api.post('/users', { username, password });
      setMsg('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setMsg('Registration failed. Username might already exist.');
    }
  };

  return (
    <div className="login-container">
      <h2 className='product-header'>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label><br />
          <input
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
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
        {msg && <p>{msg}</p>}
        <button type="submit" className="action-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
