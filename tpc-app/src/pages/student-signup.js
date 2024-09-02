import React, { useState } from 'react';
import '../styles/student-signup.css';

function StudentSignup() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    // Clear any previous error messages
    setErrors({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Validate fullname
    if (fullname === '') {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: 'Fullname cannot be empty.' }));
      valid = false;
    }

    // Validate email
    if (email === '') {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email cannot be empty.' }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address.' }));
      valid = false;
    }

    // Validate password
    if (password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 8 characters long.' }));
      valid = false;
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
      valid = false;
    }

    // If all fields are valid, proceed with submission
    if (valid) {
      alert(`Welcome, ${fullname}! Your account has been created.`);
      setFullname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
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
            <a href="student-signup.html" className="tab active">Student</a>
            <a href="recruiter-signup.html" className="tab">Recruiter</a>
            <a href="coordinator-signup.html" className="tab">Coordinator</a>
          </div>
          <input
            type="text"
            id="fullname"
            placeholder="Name"
            required
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
          {errors.fullname && <span className="error-message">{errors.fullname}</span>}
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">Already have an account? <a href="student-login.html">Login.</a></p>
      </div>
    </div>
    </div>
  );
}

export default StudentSignup;