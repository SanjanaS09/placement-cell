import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import database from '../firebaseConfig';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import '../styles/student-signup.css';

const TPOSignup = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      const register = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state
        const timestamp = new Date();
    
        if (!validatePassword()) {
          setLoading(false);
          return;
        }
    
        firebase.auth().createUserWithEmailAndPassword(companyEmail, password)
          .then((userCredential) => {
            const userId = userCredential.user.uid;
    
            database.ref(`users/Recruiter/${userId}`).set({
              companyName,
              companyEmail,
              role: "Recruiter",
              createdOn: timestamp.toLocaleString(),
            }).then(() => {
              setLoading(false);
              firebase.auth().signOut();
              navigate("/TPOLogin");
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
          <h2>Join Us as a Recruiter!</h2>
          <p>Sign up to gain access to exclusive resources, events, and more!</p>
        </div>
        <div className="right-section">
          <h2>Signup</h2>
          <form id="signupForm" onSubmit={register}>
            <div className="role-tabs">
              <Link to="/StudentSignup" className="tab">Student</Link>
              <Link to="/RecruiterSignup" className="tab active">Recruiter</Link>
              <Link to="/TPOSignup" className="tab">Coordinator</Link>
            </div>
            <input
              type="text"
              id="companyName"
              placeholder=" Company Name"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {errors.fullname && <span className="error-message">{errors.fullname}</span>}
            <input
              type="email"
              id="companyEmail"
              placeholder="Company Email"
              required
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            <button type="button" className="toggleShowPassword" onClick={toggleShowPassword}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            <button type="submit" disabled={loading} >Signup</button>
          </form>
          <p className="login-link">Already have an account? <Link to="/RecruiterLogin">Login.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default TPOSignup;