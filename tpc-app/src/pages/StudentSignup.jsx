import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import database from '../firebaseConfig';
import '../styles/student-signup.css';

const StudentSignup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate password complexity and match
  const validatePassword = () => {
    let isValid = true;
    const newErrors = {};
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!password.match(passwordRegex)) {
      isValid = false;
      newErrors.password = 'Password must be 8+ characters with an uppercase, lowercase, number, and special character.';
    }

    if (password !== confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to handle user registration and store data in the Realtime Database
  const register = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    const timestamp = new Date();

    if (!validatePassword()) {
      setLoading(false);
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        database.ref(`users/Student/${userId}`).set({
          fullname,
          email,
          role: "Student",
          createdOn: timestamp.toLocaleString(),
        }).then(() => {
          setLoading(false);
          firebase.auth().signOut();
          navigate("/StudentLogin");
        }).catch((err) => {
          setErrors({ general: 'Failed to sign up. Please try again.' });
          setLoading(false);
        });
      })
      .catch((err) => {
        setErrors({ general: 'Failed to sign up. Please try again.' });
        setLoading(false);
      });
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="body">
      <div className="container-signup">
        <div className="left-section">
          <h2>Join Us!</h2>
          <p>Sign up to gain access to exclusive resources, events, and more!</p>
        </div>
        <div className="right-section">
          <h2>Signup</h2>
          <form id="signupForm" onSubmit={register}>
            {/* Role Tabs */}
            <div className="role-tabs">
              <Link to="/StudentSignup" className="tab active">Student</Link>
              <Link to="/RecruiterSignup" className="tab">Recruiter</Link>
              <Link to="/TPOSignup" className="tab">Coordinator</Link>
            </div>

            {/* Fullname Input */}
            <input
              type="text"
              id="fullname"
              placeholder="Full Name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            {errors.fullname && <span className="error-message">{errors.fullname}</span>}

            {/* Email Input */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}

            {/* Password Input */}
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}

            {/* Confirm Password Input */}
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}

            {/* Toggle Password Visibility */}
            <button type="button" className="toggleShowPassword" onClick={toggleShowPassword}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>

            {/* General Errors */}
            {errors.general && <span className="error-message">{errors.general}</span>}

            {/* Submit Button */}
            <button type="submit" disabled={loading} onClick={() => console.log('Button clicked')}>Submit</button>
          </form>

          {/* Login Link */}
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
