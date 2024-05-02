import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import LockIcon from '@mui/icons-material/Lock'; // Import Lock icon from Material-UI/icons
import EmailIcon from '@mui/icons-material/Email'; // Import Email icon from Material-UI/icons
import "./CSS/Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  
  // Using useReducer for managing form data
  const [formData, setFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { email: "", password: "" }
  );
  
  // Using useState for managing error messages
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      await login(formData.email, formData.password);
      navigate("/account");
    } catch (error) {
      setErrorMessage(error.message); // Access error message from error object
    }
  };

  return (
    <div className="login">
      <div className="heading">
        <h2>Sign in</h2>
        <form onSubmit={doLogin}> {/* Use onSubmit instead of onClick for form submission */}
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
              <EmailIcon /> {/* Use Email icon from Material-UI */}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username or email"
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
            />
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
              <LockIcon /> {/* Use Lock icon from Material-UI */}
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
            />
          </div>
          <button type="submit" className="float">
            Login
          </button>
        </form>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>} {/* Use && for conditional rendering */}
    </div>
  );
};
