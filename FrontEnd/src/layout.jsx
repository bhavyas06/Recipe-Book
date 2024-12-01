import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { SignIn } from "./components/signin/index.jsx";
import { SignUp } from "./components/signup/index.jsx";
import { useState } from "react";

export function Layout() {
  const [isLoginVisible, setLoginVisible] = useState(false); 
  const [isRegisterVisible, setRegisterVisible] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  const toggleLoginPopup = () => {
    setLoginVisible(!isLoginVisible);
  };

  const toggleRegisterPopup = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true); 
    setLoginVisible(false);  
    console.log("Login successful, proceed with app flow.");
  };

  return (
    <div className="container">
      <header>
        <Header isLoggedIn={isLoggedIn} togglePopup={toggleLoginPopup} /> 
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
      <main style={{ marginTop: "100px", padding: "10px" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
