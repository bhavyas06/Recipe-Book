import { useRef, useState } from "react";
import "./index.css";

export function SignIn({ togglePopup, toggleRegisterPopup, onLoginSuccess }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  // Track form submission state

  const signInHandler = (event) => {
    event.preventDefault();
    setIsSubmitting(true);  // Set submitting state to true

    const formValuesObject = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    console.log("Form values:", formValuesObject);

    // Validate that the fields are not empty
    if (formValuesObject.email && formValuesObject.password) {
      // Get the list of users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the user exists and the password matches
      const user = users.find(
        (user) => user.email === formValuesObject.email && user.password === formValuesObject.password
      );

      if (user) {
        console.log("Login successful!");
        setLoginError(false);
        // Store the logged-in user in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));  
        alert("Login successful!");  // Displaying success alert
        onLoginSuccess(); // Notify the parent component (Header) about successful login
        togglePopup(); // Close the login popup
      } else {
        setLoginError(true);
        console.log("Login failed: Invalid credentials.");
      }
    } else {
      alert("Please fill out all fields.");
      setLoginError(true);
    }

    setIsSubmitting(false);  // Reset submitting state after completion
  };

  return (
    <div id="popup-1" className="popup active">
      <div className="content">
        {/* Corrected onClick for the close button */}
        <div className="close-btn" onClick={togglePopup} style={{ cursor: "pointer" }}>
          x
        </div>
        <p className="log1">
          Log In to{" "}
          <span style={{ fontWeight: "bold", color: "#178F7A" }}>Recipe Realm</span>
        </p>
        <form onSubmit={signInHandler}>
          <div className="input-field">
            <input
              ref={emailRef}
              id="loginEmail"
              placeholder="Email"
              className="validate"
              type="email"
              required
            />
          </div>
          <div className="input-field">
            <input
              ref={passwordRef}
              id="loginPassword"
              type="password"
              placeholder="Password"
              className="validate"
              required
            />
          </div>
          <button 
            type="submit" 
            className="second-button" 
            disabled={isSubmitting} // Disable the button when submitting
          >
            {isSubmitting ? "Logging In..." : "Log In"} {/* Button text change during submission */}
          </button>
        </form>
        {loginError && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
            Invalid email or password. Please try again.
          </p>
        )}
        <p>
          Don't have an account?{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              togglePopup();
              toggleRegisterPopup();
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

