// import { useRef } from "react";

// export function SignIn() {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const togglePopup = () => {
//     var popup1 = document.getElementById("popup-1");
//     var popup2 = document.getElementById("popup-2");

//     popup1.classList.toggle("active");
//     if (popup2.classList.contains("active")) {
//         popup2.classList.remove("active");
//     }
//   }

//   const signUpHandler = (event) => {
//     event.preventDefault();

//     var formValuesObject = {
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };

//     console.log("The event is: ", event);
//     console.log("The form values are  is: ", formValuesObject);

//     if (
//       formValuesObject.email &&
//       formValuesObject.password
//     ) {
//       console.log("Submit this form");
//       // fetch("localhost:8080/signup")
//       // Make an api/web service call to submit the user details
//     } else {
//       alert("Form is invalid");
//     }
//   };

//   return (
//     <>
//       <div id="popup-1" className="popup" style={{display: "block"}}>
//         <div className="content">
//           <div className="close-btn" onClick={togglePopup}>x</div>
//           <p className="log1">Log In to <span style={{fontWeight: "bold", color: "#178F7A"}}>Recipe Realm</span></p>
//           <form onSubmit={signUpHandler}>
//             <div className="input-field"><input id="loginEmail" placeholder="Email" className="validate" type="email"/></div>
//             <div className="input-field"><input id="loginPassword" type="password" placeholder="Password" className="validate"/></div>
//           </form>
//           <button className="second-button" onclick={togglePopup}>Log In</button>
//           <p>Don't have an account? <a onClick={togglePopup}><span
//                 style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}>Register</span></a></p>
//         </div>
//       </div>
//     </>
//   );
// }

import { useRef } from "react";

export function SignIn({ togglePopup, toggleRegisterPopup }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signUpHandler = (event) => {
    event.preventDefault();

    const formValuesObject = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("Form values:", formValues);

    if (formValuesObject.email && formValuesObject.password) {
      console.log("Form is valid. Submit this form.");
    } else {
      alert("Please fill out all fields.");
    }
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
        <form onSubmit={signUpHandler}>
          <div className="input-field">
            <input
              ref={emailRef}
              id="loginEmail"
              placeholder="Email"
              className="validate"
              type="email"
            />
          </div>
          <div className="input-field">
            <input
              ref={passwordRef}
              id="loginPassword"
              type="password"
              placeholder="Password"
              className="validate"
            />
          </div>
          <button type="submit" className="second-button">
            Log In
          </button>
        </form>
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
