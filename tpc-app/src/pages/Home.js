import React from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/sndt-logo.webp';
import homeImage from '../assests/Homeimage.jpg';

function Home() {
    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/yourprofile', '_blank');
    };

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/yourprofile', '_blank');
    };

    const handleTwitterClick = () => {
        window.open('https://twitter.com/yourprofile', '_blank');
    };

    const navigate = useNavigate();
    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="/Home">Home</a></li>
                    <li><a href="/Home">About</a></li>
                    <li><a href="/contactus">Contact</a></li>
                </ul>
                <div className="social-media">
                    <a role="button" tabIndex="0" onClick={handleLinkedInClick}>LinkedIn</a>
                    <a role="button" tabIndex="0" onClick={handleInstagramClick}>Instagram</a>
                    <a role="button" tabIndex="0" onClick={handleTwitterClick}>Twitter</a>
                </div>
            </nav>
            {/* HOME */}
            <div className="home">
                <img id="college-img" src={homeImage} alt="college" />
                <div className="login-buttons">
                    <div className="frame">
                        <button onClick={() => navigate('/student-login')} className="custom-btn btn-1">Student</button>
                        <button onClick={() => navigate('/recruiter-login')} className="custom-btn btn-1">Recruiters</button>
                        <button onClick={() => navigate('/coordinator-login')} className="custom-btn btn-1"><span>TPO</span></button>
                    </div>
                </div>
            </div>

            {/* ABOUT US */}
            <div className="about-container">
                <h1>About Us</h1>
                <p>
                    Our company thrives on creativity and innovation, pushing the boundaries to bring the best products and services to our clients.
                    We believe in the power of collaboration and are committed to building a better future, one step at a time.
                </p>
            </div>

            {/* STATISTICS */}
            <section className="container-counter">
                <div className="counters">
                    <div>
                        <div className="counter">
                            <h1><span data-count="156">0</span></h1>
                            <h3>Projects Completed</h3>
                        </div>
                        <div className="counter">
                            <h1><span data-count="227">0</span></h1>
                            <h3>Satisfied Clients</h3>
                        </div>
                        <div className="counter">
                            <h1><span data-count="321">0</span></h1>
                            <h3>Success Rate</h3>
                        </div>
                        <div className="counter">
                            <h1><span data-count="254">0</span></h1>
                            <h3>Years Experience</h3>
                        </div>
                    </div>
                </div>
                <div style={{ minHeight: '20em' }}></div>
            </section>

            <div className="statistics">
                <div className="container">
                    <div className="chart">
                        <canvas id="barchart" width="300" height="300"></canvas>
                    </div>
                    <div className="chart">
                        <canvas id="doughnut" width="300" height="300"></canvas>
                    </div>
                    <div className="chart">
                        <canvas id="horibarchart" width="300" height="300"></canvas>
                    </div>
                    <div className="chart">
                        <canvas id="linechart" width="300" height="300"></canvas>
                    </div>
                </div>
            </div>

            {/* HIGHEST PLACED */}
            <section className="top-students">
                <div className="student-card">
                    <img src="image/1.jpg" alt="Student 1" className="student-photo" />
                    <div className="student-info">
                        <h3>John Doe</h3>
                        <p>"I am excited to start my journey at Google. The experience and learning at college prepared me well!"</p>
                        <p><strong>Package:</strong> $120,000</p>
                        <p><strong>Company:</strong> Google</p>
                    </div>
                </div>
                <div className="student-card">
                    <img src="image/2.jpg" alt="Student 2" className="student-photo" />
                    <div className="student-info">
                        <h3>Jane Smith</h3>
                        <p>"Joining Microsoft is a dream come true! Thanks to the placement cell for their guidance."</p>
                        <p><strong>Package:</strong> $115,000</p>
                        <p><strong>Company:</strong> Microsoft</p>
                    </div>
                </div>
                <div className="student-card">
                    <img src="image/3.jpg" alt="Student 3" className="student-photo" />
                    <div className="student-info">
                        <h3>Mike Johnson</h3>
                        <p>"I am thrilled to be part of Amazon. The hard work has truly paid off!"</p>
                        <p><strong>Package:</strong> $110,000</p>
                        <p><strong>Company:</strong> Amazon</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <div className="testimonial-container">
                <div className="testimonial-card">
                    <p className="testimonial-title">Hired across multiple profiles</p>
                    <p className="testimonial-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="testimonial-author">
                        <img src="image/man-avatar-icon-free-vector.jpg" alt="Manish Nichani" className="author-photo" />
                        <p>Manish Nichani<br /><span>Airbnb</span></p>
                    </div>
                </div>

                <div className="testimonial-card">
                    <p className="testimonial-title">Best hiring platform</p>
                    <p className="testimonial-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="testimonial-author">
                        <img src="image/female-avatar-icon-free-vector.jpg" alt="Sarah Miller" className="author-photo" />
                        <p>Sarah Miller<br /><span>Google</span></p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer>
                <div className="footer-container">
                    <div className="footer-logo">
                        <img src={logo} alt="Footer Logo" />
                    </div>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                    <div className="footer-social-media">
                        <a href="#">LinkedIn</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div>
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
