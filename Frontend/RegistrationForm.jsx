// Import React, useState(Hook), FormStyle(CSS) :
import React, { useState } from "react";
import "./FormStyles.css";

// Create RegistrationForm Functional Component :
const RegistrationForm = ({ switchForm }) => {
  // {switchForm} is a prop received from App.js

  // Create State Variables to store value entered by user :
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    naukriId: "",
    linkedInId: "",
  });
  const [errors, setErrors] = useState({});

  // Create handleChange Function - an event handler function that is triggered whenever the user types in any input field
  const handleChange = (e) => {
    const { name, value } = e.target; //Destructures the name and value from input field that triggers event
    setFormData((prev) => ({ ...prev, [name]: value })); // name - correponds to key of setFormData, value-corresponds the new value entered by user
  };

  // Create handleSubmit Function - event handler that gets triggered when the form is submitted (via clicking the submit button)
  const handleSubmit = async (e) => {
    e.preventDefault(); // preventDefault() is method to handle the page reload manually and manage form data
    const formErrors = validateRegistrationForm(); //call validateLoginForm function and store it in formErrors
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/api/auth/register/",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Registration Successful : ", data);
        } else {
          setErrors(data);
        }
      } catch (err) {
        console.error("Registration error : ", err);
      }
    } else {
      setErrors(formErrors);
    } //if any error in entered data it shows error message by updating error state variable setError
  };

  // Create validateRegistrationForm Function -checks whether the form fields have been correctly filled out. If any field is invalid, it adds an error message to the formErrors object
  const validateRegistrationForm = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = "Username is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match.";
    if (!formData.firstName) formErrors.firstName = "First Name is required.";
    if (!formData.lastName) formErrors.lastName = "Last Name is required.";
    if (!formData.mobileNumber)
      formErrors.mobileNumber = "Mobile number is required.";
    return formErrors;
  };

  // Create return part of JSX in RegistrationForm Functional Component :
  return (
    <div className="form-container">
      <h2>!... Registration Form ...!</h2>

      {/* Create Form Element which listens the Submit event and returns handleSubmit function when form submitted */}
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(formData).map((key) => (
          <div key={key} className="input-group">
            <label htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </label>
            <input
              type={key.includes("password") ? "password" : "text"}
              id={key}
              name={key}
              value={formData[key]} // value of each input is controlled by the corresponding property in the formData state
              onChange={handleChange} // Each input triggers the handleChange function when its value changes
              required
            />
            {errors[key] && <span className="error">{errors[key]}</span>}
          </div>
        ))}
        <button type="submit" className="btn">
          Register
        </button>
        <div className="switch-form">
          <p>
            Already have an account?{" "}
            <span onClick={() => switchForm("login")}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

//Object.keys(formData) --> retrieves an array of keys from the formData object (e.g., ['username', 'email', 'password', ...])
//.map()--> Loops through each key in formData and renders a corresponding input field for each property
// key.replace(...) --> uses regular expressions to insert a space before uppercase letters (e.g., firstName becomes First Name)
//  <input type={key.includes('password') ? 'password' : 'text'} ... /> -->  Conditionally renders the input type as password for fields like password and confirmPassword. For other fields, it renders a text input
// {errors[key] && <span className="error">{errors[key]}</span>} --> If there is an error for the specific field (e.g., username, email), it displays the error message in a <span> with the error class for styling
