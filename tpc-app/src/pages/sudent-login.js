import React, from 'react';
import { Link } from 'react-router-dom';
import '../styles/student-login.css';

function StudentLogin() {
    // const [fullname, setFullname] = useState('');
    // const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState({});

    // const validateForm = () => {
    //     const newErrors = {};
    //     if (!fullname) newErrors.fullname = "Name is required";
    //     if (!password) newErrors.password = "Password is required";
    //     return newErrors;
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newErrors = validateForm();
    //     if (Object.keys(newErrors).length === 0) {
    //         // Perform login action here
    //         console.log('Form submitted:', { fullname, password });
    //     } else {
    //         setErrors(newErrors);
    //     }
    // };

    return (
        <div className="container">
            <div className="left-section">
                <h2>Welcome Back!</h2>
                <h3>Student Login</h3>
                <br />
                <p>Access your account to explore job opportunities and manage your applications.</p>
            </div>
            <div className="right-section">
                <h2>Login</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="role-tabs">
                        <Link to="/student-login" className="tab">Student</Link>
                        <Link to="/recruiter-login" className="tab active">Recruiter</Link>
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

                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}

                    <a href="forgot-password.html" className="forgot-password-link">Forgot your password?</a>
                    <button type="submit">Login</button>

                    <p className="signup-link">Don't have an account? <a href="student-signup.html">Sign up now.</a></p>
                </form>
            </div>
        </div>
    );
}

export default StudentLogin;
