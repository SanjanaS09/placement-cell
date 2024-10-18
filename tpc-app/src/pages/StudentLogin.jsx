import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import database from '../firebaseConfig';
import '../styles/student-login.css';

function StudentLogin({ setLoggedInUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const loggedInUserId = userCredential.user.uid;

      // Fetch user data from the database
      const userSnapshot = await database.ref(`users/Student/${loggedInUserId}`).once('value');

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        setLoggedInUser(userData); // Set the logged-in user data

        // Redirect to StudentPage if the user is a student
        if (userData.role === 'Student') {
          navigate('/StudentPage');
        } else {
          setErrors('Invalid role or access. Please contact support.');
        }
      } else {
        setErrors('User data not found. Please check your credentials.');
      }
    } catch (error) {
      setErrors('Login failed. Please check your credentials.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="role-tabs">
              <Link to="/StudentLogin" className="tab active">Student</Link>
              <Link to="/RecruiterLogin" className="tab">Recruiter</Link>
              <Link to="/TPOLogin" className="tab">Coordinator</Link>
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
              Don't have an account? <Link to="/StudentSignup">Sign up now.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
