import { useRef, useState } from "react";
import "./index.css";

export function SignIn({ togglePopup, toggleRegisterPopup, onLoginSuccess }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = () => setLoginError(false);

  const signInHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formValuesObject = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    if (formValuesObject.email && formValuesObject.password) {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formValuesObject, action: "signIn" }),
        });

        const result = await response.json();

        if (response.ok && result.token) {
          console.log("Login successful!");
          setLoginError(false);

          localStorage.setItem("authToken", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          onLoginSuccess();
          togglePopup();
        } else {
          setLoginError(true);
          console.log("Login failed:", result.error);
        }
      } catch (error) {
        setLoginError(true);
        console.error("Error during sign-in:", error);
      }
    } else {
      alert("Please fill out all fields.");
      setLoginError(true);
    }

    setIsSubmitting(false);
  };

  return (
    <div id="popup-1" className="popup active">
      <div className="content">
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="second-button" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
        {loginError && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }} aria-live="polite">
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
