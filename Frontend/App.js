import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const switchForm = (form) => setCurrentForm(form);

  return (
    <div className="app-container">
      {currentForm === "login" ? (
        <LoginForm switchForm={switchForm} />
      ) : (
        <RegistrationForm switchForm={switchForm} />
      )}
    </div>
  );
};

export default App;
