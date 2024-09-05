// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import '../styles/student-login.css';
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// function StudentSignup() {
//   // State variables
//   const [fullname, setFullname] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword ] = useState('');
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!fullname) newErrors.fullname = 'Name is required';
//     if (!password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   useEffect(() => {
//     try {
//       if (firebase.auth().currentUser.uid) {
//         setLoggedInUser(firebase.auth().currentUser.uid);
//         // Track successful login event
//         window.gtag("event", "session_continued", {
//           event_category: "loggned_in_with_persistence",
//           event_label: "logged_in",
//           user: firebase.auth().currentUser.email
//         });
//         navigate("/StudentPage");
//       }
//     }
//     catch (error) {
//       console.log(error.message)
//     }
//   }, [setLoggedInUser, navigate])

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
  
//     firebase.auth().setPersistence('session').then(() =>
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//           const loggedInUser = userCredential.user.uid;
//     setLoggedInUser(loggedInUser);
//           // Track successful login event
//           window.gtag("event", "login", {
//             event_category: "email/password",
//             event_label: "logged_in",
//           });
//           navigate("/StudentPage");
//         }))
//       .catch((error) => {
//         // Track login failed event
//         window.gtag("event", "login_failed", {
//           event_category: "email/password",
//           event_label: error.message,
//         });
//         // Handle login error
//         setErrors(error.message);
//         console.error("Login Error:", error);
//       });
//   };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

const SignIn = () => {
  // Define state
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  // Effect to check if the user is already logged in
  useEffect(() => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        setLoggedInUser(user.uid);
        // Track successful login event
        window.gtag("event", "session_continued", {
          event_category: "logged_in_with_persistence",
          event_label: "logged_in",
          user: user.email
        });
        navigate("/StudentPage");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [setLoggedInUser, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() =>
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const loggedInUser = userCredential.user.uid;
            setLoggedInUser(loggedInUser);
            // Track successful login event
            window.gtag("event", "login", {
              event_category: "email/password",
              event_label: "logged_in",
            });
            navigate("/StudentPage");
          })
      )
      .catch((error) => {
        // Track login failed event
        window.gtag("event", "login_failed", {
          event_category: "email/password",
          event_label: error.message,
        });
        // Handle login error
        setErrors(error.message);
        console.error("Login Error:", error);
      });
  };
  const toggleShowPassword= () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="body">
    <div className="container-signup">
      <div className="left-section">
        <h2>Join Us as a Student!</h2>
        <p>Sign up to gain access to exclusive resources, events, and more!</p>
      </div>
      <div className="right-section">
        <h2>Signup</h2>
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="role-tabs">
            <Link to ="/student-signup" className="tab active">Student</Link>
            <Link to="/recruiter-signup" className="tab">Recruiter</Link>
            <Link to="/coordinator-signup" className="tab">Coordinator</Link>
          </div>
          <input
            type="text"
            id="fullname"
            placeholder="Name"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          {errors.fullname && <span className="error-message">{errors.fullname}</span>}
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          <div
            className="toggleShowPassowrd"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </div>
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">Already have an account? <Link to = "/student-login">Login.</Link></p>
      </div>
    </div>
    </div>
  );
}

export default StudentSignup;