import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../styles/student-login.css'; // Make sure to create a separate CSS file if needed

function RecruiterLogin({ setLoggedInUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  // Check for persisted user
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setLoggedInUser(user.uid);
      navigate('/RecruiterPage');
    }
  }, [setLoggedInUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const loggedInUserId = userCredential.user.uid;

      setLoggedInUser(loggedInUserId);
      navigate('/RecruiterPage'); // Change this to the appropriate route for Recruiters
    } catch (error) {
      // Handle login error
      setErrors(error.message);
      console.error('Login Error:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="body">
      <div className="container-login">
        <div className="left-section">
          <div className="left-section-content">
            <h2>Welcome Back!</h2>
            <h3>Recruiter Login</h3>
            <p>Access your account to explore job opportunities and manage applications.</p>
          </div>
        </div>
        <div className="right-section">
          <h2>Login</h2>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="role-tabs">
              <Link to="/StudentLogin" className="tab">Student</Link>
              <Link to="/RecruiterLogin" className="tab active">Recruiter</Link>
              <Link to="/CoordinatorLogin" className="tab">Coordinator</Link>
            </div>
            <input
              className="col-10"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="col-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="toggleShowPassword" onClick={toggleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </div>
            {errors && <span className="error-message">{errors}</span>}

            <a href="/forgot-password" className="forgot-password-link">Forgot your password?</a>
            <button type="submit">Login</button>

            <p className="signup-link">
              Don't have an account? <Link to="/RecruiterSignup">Sign up now.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecruiterLogin;
