import React, {useRef, useState} from 'react';
import { useAuth} from '../Auth/AuthContext.js';
import { useNavigate, Link  } from 'react-router-dom';
import '../styles/student-login.css';

function StudentLogin({ setLoggedInUser }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrors("");

        try {
            const loggedInUserCredential = await login(emailRef.current.value, passwordRef.current.value);
            const user = loggedInUserCredential.user;

            if (user) {
                if (setLoggedInUser) {
                    setLoggedInUser(user.uid);
                }
                navigate('/RecruiterPage');
            }
        } catch (error) {
            setErrors("Failed to log in");
            console.error("Error during login or saving user data:", error.message);
        } finally {
            setLoading(false);
        }
    }

    const toggleShowPassword = () => {
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
                            <Link to="/StudentLogin" className="tab">Student</Link>
                            <Link to="/RecruiterLogin" className="tab active">Recruiter</Link>
                            <Link to="/CoordinatorLogin" className="tab">Coordinator</Link>
                        </div>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            ref={emailRef}
                            required
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                ref={passwordRef}
                                required
                            />
                           <button type="button" className="toggleShowPassword" onClick={toggleShowPassword}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}

                        <a href="/forgot-password" className="forgot-password-link">Forgot your password?</a>
                        <button type="submit" disabled = {loading} >Login</button>

                        <p className="signup-link">Don't have an account? <Link to="/RecruiterSignup">Sign up now.</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;