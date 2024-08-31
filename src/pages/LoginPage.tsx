import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/Login'; // Import the Login component

const LoginPage: React.FC = () => {
  const history = useHistory();

  const handleLoginSubmit = (username: string, password: string) => {
    // Handle login logic here (e.g., API call, state update)
    console.log('Login credentials:', username, password);

    // Simulate successful login (replace with actual logic)
    const isLoggedIn = true;

    if (isLoggedIn) {
      history.push('/case', { username }); // Redirect to Case page with username
    }
  };

  return (
    <Login pageTitle="Login" para="Enter Credentials" actBtn="Login" onSubmit={handleLoginSubmit} />
  );
};

export default LoginPage;