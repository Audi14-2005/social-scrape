// src/pages/LoginPage.tsx
import React from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Login"; // Import the Login component
import { login } from "../services/apiservices"; // Import the login function from apiService

const LoginPage: React.FC = () => {
  const history = useHistory();

  const handleLoginSubmit = async (username: string, password: string) => {
    try {
      // Use the login function from apiService
      const data = await login(username, password);
      console.log("Login successful:", data);

      // Redirect to Case page on successful login
      history.push("/case", { username });
    } catch (error) {
      // Handle error, with type assertion for safety
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message || "Invalid credentials, please try again.");
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred, please try again.");
      }
    }
  
  };
  const handleSignupClick = () => {
    history.push("/signup");
  };

  return (
    <>
    <Login
      pageTitle="Login"
      para="Enter Credentials"
      actBtn="Login"
      chipMsg={"Don't have an account? Sign up here"}
      handleUser={handleSignupClick}
      onSubmit={handleLoginSubmit}
    />
    </>
  );
};

export default LoginPage;
