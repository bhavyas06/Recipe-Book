// import { Header } from "./Header";
// import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer.jsx";
// import { SignIn } from "./components/signin/index.jsx";
// import { SignUp } from "./components/signup/index.jsx";
// import { useState } from "react";

// export function Layout() {
//   const [isLoginVisible, setLoginVisible] = useState(false); // Controls login popup visibility
//   const [isRegisterVisible, setRegisterVisible] = useState(false); // Controls register popup visibility
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     // Initialize isLoggedIn from localStorage
//     return localStorage.getItem("isLoggedIn") === "true";
//   });

//   const toggleLoginPopup = () => {
//     setLoginVisible(!isLoginVisible);
//   };

//   const toggleRegisterPopup = () => {
//     setRegisterVisible(!isRegisterVisible);
//   };

//   const onLoginSuccess = () => {
//     setIsLoggedIn(true); // Set the login state to true
//     localStorage.setItem("isLoggedIn", "true"); // Persist login state
//     setLoginVisible(false); // Close the login popup
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false); // Reset login state
//     localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
//     localStorage.removeItem("loggedInUser"); // Optionally clear user data
//   };

//   return (
//     <div className="container">
//       <header>
//         <Header 
//           isLoggedIn={isLoggedIn} 
//           togglePopup={toggleLoginPopup} 
//           handleLogout={handleLogout} 
//         />
//         {isLoginVisible && (
//           <SignIn
//             togglePopup={toggleLoginPopup}
//             toggleRegisterPopup={toggleRegisterPopup}
//             onLoginSuccess={onLoginSuccess}
//           />
//         )}
//         {isRegisterVisible && (
//           <SignUp
//             togglePopup={toggleLoginPopup}
//             toggleRegisterPopup={toggleRegisterPopup}
//           />
//         )}
//       </header>
//       <main style={{ marginTop: "20px", padding: "10px" }}>
//         <Outlet />
//       </main>
//       <footer>
//         <Footer />
//       </footer>
//     </div>
//   );
// }

// import { Header } from "./Header";
// import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer.jsx";
// import { SignIn } from "./components/signin/index.jsx";
// import { SignUp } from "./components/signup/index.jsx";
// import { useState, useEffect } from "react";

// export function Layout() {
//   const [isLoginVisible, setLoginVisible] = useState(false); // Controls login popup visibility
//   const [isRegisterVisible, setRegisterVisible] = useState(false); // Controls register popup visibility
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return localStorage.getItem("isLoggedIn") === "true";
//   });

//   useEffect(() => {
//     // Synchronize login state from localStorage on mount
//     const loginState = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loginState);
//   }, []);

//   const toggleLoginPopup = () => {
//     setLoginVisible(!isLoginVisible);
//   };

//   const toggleRegisterPopup = () => {
//     setRegisterVisible(!isRegisterVisible);
//   };

//   const onLoginSuccess = () => {
//     setIsLoggedIn(true); 
//     localStorage.setItem("isLoggedIn", "true"); 
//     setLoginVisible(false); 
//   };
  
//   const handleLogout = () => {
//     setIsLoggedIn(false); 
//     localStorage.setItem("isLoggedIn", "false");
//   };

//   return (
//     <div className="container">
//       <header>
//         <Header 
//           isLoggedIn={isLoggedIn} 
//           togglePopup={toggleLoginPopup} 
//           handleLogout={handleLogout} 
//         />
//         {isLoginVisible && (
//           <SignIn
//             togglePopup={toggleLoginPopup}
//             toggleRegisterPopup={toggleRegisterPopup}
//             onLoginSuccess={onLoginSuccess}
//           />
//         )}
//         {isRegisterVisible && (
//           <SignUp
//             togglePopup={toggleLoginPopup}
//             toggleRegisterPopup={toggleRegisterPopup}
//           />
//         )}
//       </header>
//       <main style={{ marginTop: "20px", padding: "10px" }}>
//         <Outlet context={{isLoggedIn}}/>
//       </main>
//       <footer>
//         <Footer />
//       </footer>
//     </div>
//   );
// }

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

  const toggleLoginPopup = () => setLoginVisible(!isLoginVisible);
  const toggleRegisterPopup = () => setRegisterVisible(!isRegisterVisible);
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
        <Outlet context={{ isLoggedIn }} /> {/* Passing isLoggedIn here */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}