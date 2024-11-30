import { useRef, useState } from "react";
import "./index.css";

export function SignUp({ togglePopup, toggleRegisterPopup }) {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const signUpHandler = (event) => {
    event.preventDefault();

    // Collect form values
    const formValuesObject = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("The form values are: ", formValuesObject);

    // Check if all fields are filled
    if (
      formValuesObject.name &&
      formValuesObject.phone &&
      formValuesObject.email &&
      formValuesObject.password
    ) {
      // Check if the email already exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some((user) => user.email === formValuesObject.email);

      if (userExists) {
        setShowFailureAlert(true);
        setShowSuccessAlert(false);
        alert("User with this email already exists.");
      } else {
        // Add the new user to the existing users array
        existingUsers.push(formValuesObject);

        // Store the updated list of users in localStorage
        localStorage.setItem("users", JSON.stringify(existingUsers));

        setShowSuccessAlert(true);
        setShowFailureAlert(false);
        alert("Registration successful! You can now log in.");
        
        // Optionally, you can close the popup after successful registration
        toggleRegisterPopup();
        togglePopup();
      }
    } else {
      setShowFailureAlert(true);
      setShowSuccessAlert(false);
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      <div id="popup-2" className="popup active">
        <div className="content">
          <div className="close-btn" onClick={toggleRegisterPopup} style={{ cursor: "pointer" }}>
            x
          </div>
          <p className="log1">
            Create Your{" "}
            <span style={{ fontWeight: "bold", color: "#178F7A" }}>Recipe Realm</span> Account
          </p>
          <form onSubmit={signUpHandler}>
            <div className="input-field">
              <input
                ref={nameRef}
                id="registerName"
                placeholder="Name"
                className="validate"
              />
            </div>
            <div className="input-field">
              <input
                ref={phoneRef}
                id="registerPhoneNumber"
                placeholder="Phone Number"
                className="validate"
              />
            </div>
            <div className="input-field">
              <input
                ref={emailRef}
                id="registerEmail"
                placeholder="Email"
                className="validate"
                type="email"
                required
              />
            </div>
            <div className="input-field">
              <input
                ref={passwordRef}
                id="registerPassword"
                placeholder="Password"
                className="validate"
                type="password"
              />
            </div>
            <button type="submit" className="second-button">
              Register
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                toggleRegisterPopup(); // Close register popup
                togglePopup(); // Open login popup
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
