import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/student-login.css';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function StudentLogin() {
  // State variables
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!fullname) newErrors.fullname = 'Name is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
  
    firebase.auth().setPersistence('session').then(() =>
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
        }))
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
    <div className="container-login">
      <div className="left-section">
        <div className="left-section-content">
          <h2>Welcome Back!</h2>
          <h3>Student Login</h3>
          <p>Access your account to explore job opportunities and manage your applications.</p>
        </div>
      </div>
      <div className="right-section">
        <h2>Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="role-tabs">
            <Link to="/student-login" className="tab active">Student</Link>
            <Link to="/recruiter-login" className="tab">Recruiter</Link>
            <Link to="/coordinator-login" className="tab">Coordinator</Link>
          </div>
          <input
            type="text"
            id="fullname"
            placeholder="Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          {errors.fullname && <span className="error-message">{errors.fullname}</span>}

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
            className="toggleShowPassowrd"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </div>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}

          <a href="/forgot-password" className="forgot-password-link">Forgot your password?</a>
          <button type="submit">Login</button>

          <p className="signup-link">Don't have an account? <Link to="/student-signup">Sign up now.</Link></p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default StudentLogin;