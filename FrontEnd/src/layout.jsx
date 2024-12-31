import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { SignIn } from "./components/signin/index.jsx";
import { SignUp } from "./components/signup/index.jsx";
import { useState, useEffect } from "react";

export function Layout() {
  const [isLoginVisible, setLoginVisible] = useState(false); 
  const [isRegisterVisible, setRegisterVisible] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginState);
  }, []);

  const toggleLoginPopup = () => {
    setLoginVisible(!isLoginVisible);
  };

  const toggleRegisterPopup = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true); 
    localStorage.setItem("isLoggedIn", "true"); 
    setLoginVisible(false); 
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false); 
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <div className="container">
      <header>
        <Header 
          isLoggedIn={isLoggedIn} 
          togglePopup={toggleLoginPopup} 
          handleLogout={handleLogout} 
        />
        {isLoginVisible && (
          <SignIn
            togglePopup={toggleLoginPopup}
            toggleRegisterPopup={toggleRegisterPopup}
            onLoginSuccess={onLoginSuccess}
          />
        )}
        {isRegisterVisible && (
          <SignUp
            togglePopup={toggleLoginPopup}
            toggleRegisterPopup={toggleRegisterPopup}
          />
        )}
      </header>
      <main style={{ marginTop: "20px", padding: "10px" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}