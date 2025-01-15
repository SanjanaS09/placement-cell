import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "../styles/student-login.css";

function LoginPage({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [activeRole, setActiveRole] = useState("Student"); // New state for role management
  const navigate = useNavigate();

  // Set the logged-in user if one exists when the component mounts
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setLoggedInUser(user.uid);
    }
  }, [setLoggedInUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const loggedInUserId = userCredential.user.uid;
      setLoggedInUser(loggedInUserId);

      // Navigate to the appropriate page after login
      if (activeRole === "Student") navigate("/StudentPage");
      else if (activeRole === "Recruiter") navigate("/RecruiterPage");
      else if (activeRole === "Coordinator") navigate("/TPOPage");
    } catch (error) {
      setErrors(error.message);
      console.error("Login Error:", error);
    }
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);

    // Navigate to role-specific pages immediately
    if (role === "Student") navigate("/StudentPage");
    else if (role === "Recruiter") navigate("/RecruiterPage");
    else if (role === "Coordinator") navigate("/TPOPage");
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
            <h3>{`${activeRole} Login`}</h3>
            <p>
              {activeRole === "Student" && "Access your student dashboard and apply for jobs."}
              {activeRole === "Recruiter" && "Explore candidates and manage job applications."}
              {activeRole === "Coordinator" && "Manage placements and coordinate activities."}
            </p>
          </div>
        </div>
        <div className="right-section">
          <h2>Login</h2>
          <div className="role-tabs">
            <button
              className={`tab ${activeRole === "Student" ? "active" : ""}`}
              onClick={() => handleRoleChange("Student")}
            >
              Student
            </button>
            <button
              className={`tab ${activeRole === "Recruiter" ? "active" : ""}`}
              onClick={() => handleRoleChange("Recruiter")}
            >
              Recruiter
            </button>
            <button
              className={`tab ${activeRole === "Coordinator" ? "active" : ""}`}
              onClick={() => handleRoleChange("Coordinator")}
            >
              Coordinator
            </button>
          </div>
          <form id="loginForm" onSubmit={handleLogin}>
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="toggleShowPassword" onClick={toggleShowPassword}>
              {showPassword ? "Hide Password" : "Show Password"}
            </div>
            {errors && <span className="error-message">{errors}</span>}

            <a href="/forgot-password" className="forgot-password-link">
              Forgot your password?
            </a>
            <button type="submit">Login</button>

            <p className="signup-link">
              Don't have an account? <Link to={`/Signup`}>Sign up now.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
