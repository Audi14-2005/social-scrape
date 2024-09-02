// src/services/apiService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Base URL for your backend

// Function to handle login API call
export const login = async (username: string, password: string) => {
  try {
    // Send POST request to the login endpoint
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Return response data (e.g., token, message)
  } catch (error) {
    // Narrow the error type to AxiosError or a general Error
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (HTTP errors)
      console.error('Axios error in login API:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    } else if (error instanceof Error) {
      // Handle non-Axios errors
      console.error('Non-Axios error in login API:', error.message);
      throw new Error(error.message || 'An unknown error occurred');
    } else {
      // If the error type is truly unknown, provide a generic message
      throw new Error('An unexpected error occurred');
    }
  }
};

export const signup = async (username: string, password: string) => {
  try {
    // Send POST request to the signup endpoint
    const response = await axios.post(`${API_URL}/signup`, { username, password });
    return response.data; // Return response data (e.g., success message)
  } catch (error) {
    // Narrow the error type to AxiosError or a general Error
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (HTTP errors)
      console.error('Axios error in signup API:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Signup failed');
    } else if (error instanceof Error) {
      // Handle non-Axios errors
      console.error('Non-Axios error in signup API:', error.message);
      throw new Error(error.message || 'An unknown error occurred');
    } else {
      // If the error type is truly unknown, provide a generic message
      throw new Error('An unexpected error occurred');
    }
  }
};

export const instalogin = async (username: string, password: string) => {
  try {
    // Send POST request to the login endpoint
    const response = await axios.post(`${API_URL}/instagram-login`, { username, password });
    return response.data; // Return response data (e.g., token, message)
  } catch (error) {
    // Narrow the error type to AxiosError or a general Error
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (HTTP errors)
      console.error('Axios error in login API:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    } else if (error instanceof Error) {
      // Handle non-Axios errors
      console.error('Non-Axios error in login API:', error.message);
      throw new Error(error.message || 'An unknown error occurred');
    } else {
      // If the error type is truly unknown, provide a generic message
      throw new Error('An unexpected error occurred');
    }
  }
};
