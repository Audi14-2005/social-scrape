import React from "react";
import Login from "../components/Login"; // Import the Login component
import { signup } from "../services/apiservices";
import { useHistory } from "react-router-dom";
const SignupPage: React.FC = () => {
    const history = useHistory();

    const handleSignUpSubmit = async (username: string, password: string) => {
        try {
          // Use the login function from apiService
          const data = await signup(username, password);
          console.log("Signup successful:", data);
    
          // Redirect to Login page on successful sign up
          history.push("/login");
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
      const handleLoginClick = () => {
        history.push("/login");
      };

  return (
    <Login
      pageTitle="Sign Up"
      para="Create a New Account"
      actBtn="Sign Up"
      chipMsg={"Existing user? Login here."} // Remove chip message as it's not relevant for signup
      handleUser={handleLoginClick}
      onSubmit={handleSignUpSubmit} // Always set to true as no backend logic is implemented
    />
  );
};

export default SignupPage;