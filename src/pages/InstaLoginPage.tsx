import React from 'react';
import Login from '../components/Login';
import { instalogin } from '../services/apiservices'; // Import instalogin function
import { useHistory } from 'react-router-dom';

const InstaLoginPage: React.FC = () => {
  const history = useHistory();

  const handleLoginSubmit = async (username: string, password: string) => {
    try {
      // Call the instalogin function from apiservices
      const data = await instalogin(username, password);
      console.log('Login successful:', data);

      // Redirect to the Case page on successful login
      history.push('/report', { username: data.username });
    } catch (error) {
      // Handle error with type assertion for safety
      if (error instanceof Error) {
        console.error('Login failed:', error.message);
        alert(error.message || 'Invalid credentials, please try again.');
      } else {
        console.error('Unknown error:', error);
        alert('An unknown error occurred, please try again.');
      }
    }
  };

  return (
    <Login
      pageTitle="Instagram"
      para="Instagram Credentials"
      actBtn="Generate Report"
      chipMsg="Back"
      onSubmit={handleLoginSubmit} // Ensure this is passed to Login component correctly
    />
  );
};

export default InstaLoginPage;