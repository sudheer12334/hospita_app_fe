import React, { useState } from 'react';
import axios from 'axios';
import './landingPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login } = useAuth(); // Use the useAuth hook
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/user/login', {
        username: username,
        password: password
      });
      console.log('Login successful');
      console.log(response);
      alert(response.data);
      login(); // Set isAuthenticated to true upon successful login
      nav('/patients');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid Username or Password');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="landing-page-container">
      <div className="left-section">
        <h1>Welcome to Sigma Hospitals</h1>
      </div>
      <div className="right-section">
        {/* <h2>Login</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="username">Username </label>
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password </label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          </div>
          <div className='button-div'>
            <button className="login-button" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
