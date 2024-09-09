import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../Auth/AuthContext.js";
import '../styles/student-signup.css';

const StudentSignup = () => {
  const [fullname, setFullname] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth()

  const handleResigter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    let newErrors = {};
    if (!fullname) newErrors.fullname = 'Full name is required';
    if (passwordRef !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      console.log('Attempting sign up with:', { email, password });

      const newUserCredential = await signup(email, password);
      const user = newUserCredential.user;

      if (user) {
        navigate('/RecruiterPage');
      }
    } catch (error) {
      console.error('Error during sign up:', error.message);

      if (error.code === 'auth/email-already-in-use') {
        setErrors("This email is already associated with an account.");
      } else {
        setErrors("Failed to sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
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
          <form id="signupForm" onSubmit={handleResigter}>
            <div className="role-tabs">
              <Link to="/StudentSignup" className="tab">Student</Link>
              <Link to="/RecruiterSignup" className="tab active">Recruiter</Link>
              <Link to="/CoordinatorSignup" className="tab">Coordinator</Link>
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
              ref={emailRef}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              ref={passwordRef}
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

export default StudentSignup;