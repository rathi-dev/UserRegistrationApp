// Import React, useState(Hook), FormStyle(CSS) :
import React, { useState } from "react";
import "./FormStyles.css"; // Import styles

// Create LoginForm Functional Component :
const LoginForm = ({ switchForm }) => {
  // {switchForm} is a prop received from App.js

  // Create State Variables to store value entered by user :
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Create event handler for Form Submission :
  const handleSubmit = async (e) => {
    e.preventDefault(); // preventDefault() is method to handle the page reload manually and manage form data
    const formErrors = validateLoginForm(); //call validateLoginForm function and store it in formErrors
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/api/auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: emailOrUsername,
            password: password,
          }),
        });
        if (!response.ok) {
          throw new Error("Login failed");
        }
        const data = await response.json();
        if (response.ok) {
          console.log("Login Successful : ", data);
        } else {
          setErrors({ login: data.error });
        }
      } catch (err) {
        console.error("Login error : ", err);
      }
    } else {
      setErrors(formErrors); //if any error in entered data it shows error message by updating error state variable setError
    }
  };

  // Create a Function to Validate a Form Fields :
  const validateLoginForm = () => {
    let formErrors = {}; //initialize empty object in formErrors variable to hold error message
    if (!emailOrUsername)
      formErrors.emailOrUsername = "Email or Username is required.";
    if (!password) formErrors.password = "Password is required.";
    return formErrors;
  };

  // Create return part of JSX in LoginForm Functional Component :
  return (
    <div className="form-container">
      <h2>!... Login Form ...!</h2>

      {/* Create Form Element which listens the Submit event and returns handleSubmit function when form submitted */}
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername} // value of input is controlled by state variable - emailOrUsername
            onChange={(e) => setEmailOrUsername(e.target.value)} // When the user types in input field onChange event updates the state variable emailOrUsername with new variable
            required
          />
          {errors.emailOrUsername && ( // If there is already existed email id typed by user it shows error message
            <span className="error">{errors.emailOrUsername}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="switch-form">
          <p>
            Don't have an account?{" "}
            <span onClick={() => switchForm("register")}>Register Here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
