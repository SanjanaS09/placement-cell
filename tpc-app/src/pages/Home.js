import React,{ useEffect, useRef, useState, useCallback } from 'react';
import '../styles/Home.css';
import { useNavigate ,Link} from 'react-router-dom';
import logo from '../assests/images/output-onlinepngtools.png';
import homeImage from '../assests/images/Homeimage.jpg';
import JohnDoe from "../assests/images/1.jpg";
import JaneSmith from "../assests/images/2.jpg";
import MikeJohnson from "../assests/images/3.jpg";
import ManIcon from "../assests/images/man-avatar-icon-free-vector.jpg";
import VilasSir from "../assests/images/coordinator.jpeg";
import LinkedIn from "../assests/images/linkedin.png";
import Facebook from "../assests/images/facebook.png";
import Instagram from "../assests/images/instagram.png";
import Twitter from "../assests/images/twitter.png";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, Title, Tooltip, Legend, ArcElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend, ArcElement, LineElement);

function Home() {
    const navigate = useNavigate();
    const countersRef = useRef([]);
    const containerRef = useRef(null);
    const [activated, setActivated] = useState(false);
  
    const updateCount = useCallback((counter) => {
      const target = +counter.getAttribute('data-count');
      const currentCount = +counter.innerText;
  
      const increment = target / 200000;  // Faster increment
      if (currentCount < target) {
        counter.innerText = Math.ceil(currentCount + increment);
        setTimeout(() => updateCount(counter), 20);  // Faster update
      } else {
        counter.innerText = target;
      }
    }, []);
  
    const handleScroll = useCallback(() => {
      if (containerRef.current) {
        const containerPosition = containerRef.current.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
  
        if (containerPosition < screenPosition && !activated) {
          countersRef.current.forEach(counter => {
            if (counter) {
              counter.innerText = '0';
              updateCount(counter);
            }
          });
          setActivated(true);
        }
      }
    }, [activated, updateCount]);
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

      const barData = {
        labels: ['CST', 'CE', 'IT', 'DS', 'ENC'],
        datasets: [{
          label: 'Branch-wise Placements',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(4, 4, 124, 0.7)',
            'rgba(36, 36, 164, 0.6)',
            'rgba(53, 53, 163, 0.5)',
            'rgba(105, 105, 182, 0.4)',
            'rgba(139, 139, 198, 0.3)'
          ],
          borderColor: 'rgb(4, 4, 152, 1)',
          borderWidth: 1,
        }],
      };
    
      const doughnutData = {
        labels: ['Accenture', 'Barclays', 'Bank of America', 'Colgate', 'Visa', 'Oracle'],
        datasets: [{
          label: '# of Placements',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(4, 4, 124, 0.7)',
            'rgba(36, 36, 164, 0.6)',
            'rgba(53, 53, 163, 0.5)',
            'rgba(105, 105, 182, 0.4)',
            'rgba(139, 139, 198, 0.3)'
          ],
          borderColor: [
            'rgb(4, 4, 152, 1)',
            'rgb(4, 4, 152, 1)',
            'rgb(4, 4, 152, 1)',
            'rgb(4, 4, 152, 1)',
            'rgb(4, 4, 152, 1)'
          ],
          borderWidth: 1,
        }],
      };
    
      const horiBarData = {
        labels: ['CST', 'CE', 'IT', 'DS', 'ENC'],
        datasets: [{
          label: 'Top Companies visiting college',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(4, 4, 124, 0.7)',
            'rgba(36, 36, 164, 0.6)',
            'rgba(53, 53, 163, 0.5)',
            'rgba(105, 105, 182, 0.4)',
            'rgba(139, 139, 198, 0.3)'
          ],
          borderColor: 'rgb(4, 4, 152, 1)',
          borderWidth: 1,
        }],
      };
    
      const lineData = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Yearly Data',
          data: [30, 45, 60, 70, 90, 100],
          borderColor: 'rgba(74, 4, 152, 1)',
          backgroundColor: 'rgba(4, 4, 124, 0.7)',
          borderWidth: 1,
        }],
      };

    return (
        <div>
            {/* NAVBAR */}
            <nav className="nav">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="/Home">Home</a></li>
                    <li><a href="/Home">About</a></li>
                    <li><a href="/contactus">Contact</a></li>
                </ul>
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
            <div className="social-media">
         <a href="https://www.linkedin.com" target="_blank"  rel="noopener noreferrer" className="social-icon">
            <img src={LinkedIn} alt="LinkedIn"/>
        </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
    <img src={Instagram} alt="Instagram"/>
  </a>
  <a href="https://www.twitter.com" target="_blank"  rel="noopener noreferrer" className="social-icon">
    <img src={Facebook} alt="Twitter"/>
  </a>
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
            <div className="container-counter">
                <div className="counters">
                    <div>
                    <div className="counter">
            <h1><span ref={el => countersRef.current[0] = el} data-count="156">0</span></h1>
            <h3>Projects Completed</h3>
          </div>
          <div className="counter">
            <h1><span ref={el => countersRef.current[1] = el} data-count="227">0</span></h1>
            <h3>Satisfied Clients</h3>
          </div>
          <div className="counter">
            <h1><span ref={el => countersRef.current[2] = el} data-count="321">0</span></h1>
            <h3>Success Rate</h3>
          </div>
          <div className="counter">
            <h1><span ref={el => countersRef.current[3] = el} data-count="254">0</span></h1>
            <h3>Years Experience</h3>
                        </div>
                    </div>
                </div>
                <div style={{ minHeight: '20em' }}></div>
            </div>

            <div className="charts-grid">
            <div className="chart-container">
        <h2>Branch-wise Placements</h2>
        <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>

      <div className="chart-container">
        <h2>Company-wise Placements</h2>
        <Doughnut data={doughnutData} />
      </div>

      <div className="chart-container">
        <h2>Top Companies Visiting (Horizontal Bar)</h2>
        <Bar data={horiBarData} options={{ indexAxis: 'y' }} />
      </div>

      <div className="chart-container">
        <h2>Yearly Placement Data</h2>
        <Line data={lineData} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>
      
    `       </div>

            {/* HIGHEST PLACED */}
            <section className="top-students">
                <div className="student-card">
                    <img src={JohnDoe} alt="Student 1" className="student-photo" />
                    <div className="student-info">
                        <h3>John Doe</h3>
                        <p>"I am excited to start my journey at Google. The experience and learning at college prepared me well!"</p>
                        <p><strong>Package:</strong> $120,000</p>
                        <p><strong>Company:</strong> Google</p>
                    </div>
                </div>
                <div className="student-card">
                    <img src= {JaneSmith} alt="Student 2" className="student-photo" />
                    <div className="student-info">
                        <h3>Jane Smith</h3>
                        <p>"Joining Microsoft is a dream come true! Thanks to the placement cell for their guidance."</p>
                        <p><strong>Package:</strong> $115,000</p>
                        <p><strong>Company:</strong> Microsoft</p>
                    </div>
                </div>
                <div className="student-card">
                    <img src={MikeJohnson} alt="Student 3" className="student-photo" />
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
                        <img src={ManIcon} alt="Manish Nichani" className="author-photo" />
                        <p>Manish Nichani<br /><span>Airbnb</span></p>
                    </div>
                </div>

                <div className="testimonial-card">
                    <p className="testimonial-title">Best hiring platform</p>
                    <p className="testimonial-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="testimonial-author">
                        <img src={ManIcon} alt="Sarah Miller" className="author-photo" />
                        <p>Sarah Miller<br /><span>Google</span></p>
                    </div>
                </div>

                <div className="testimonial-card">
                    <p className="testimonial-title">Hired across multiple profiles</p>
                    <p className="testimonial-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="testimonial-author">
                        <img src={ManIcon} alt="Manish Nichani" className="author-photo" />
                        <p>Manish Nichani<br /><span>Airbnb</span></p>
                    </div>
                </div>

                <div className="testimonial-card">
                    <p className="testimonial-title">Hired across multiple profiles</p>
                    <p className="testimonial-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="testimonial-author">
                        <img src={ManIcon} alt="Manish Nichani" className="author-photo" />
                        <p>Manish Nichani<br /><span>Airbnb</span></p>
                    </div>
                </div>
            </div>

            {/* ------------TEACHERS MESSAGE---------  */}
        <div className="message">
            <div className="coordinator-message">
                <img src= {VilasSir} alt="Coordinator" className="coordinator-image" />
                <div className="message-content">
                    <h2>Coordinator's Message</h2>
                    <p id="message">Welcome to the placement cell. We are dedicated to providing our students with the best career opportunities. Our team is here to assist you in achieving your professional goals. We believe in creating a supportive environment that fosters growth and development.</p>
                </div>
            </div>
        </div>
       <script src="message.js"></script> 

        {/* COMPANY LOGO */}
        <div className="slider">
    <div className="slider-text"><h1><b>Our Industry Recruiters</b></h1></div>
        <div className="slide-track">
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/thumbs/2x/mcdonalds-black-logo.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-black-and-white.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-black-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/nfl-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-6-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/hogwarts-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/thumbs/2x/mcdonalds-black-logo.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-black-and-white.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-black-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/nfl-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-6-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/hogwarts-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/thumbs/2x/mcdonalds-black-logo.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-black-and-white.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-black-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/nfl-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-6-logo-png-transparent.png" alt=""/>
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/hogwarts-logo-png-transparent.png" alt=""/>
          </div>
        </div>
      </div>

            {/* FOOTER */}
            <footer>

    <div className="footer-title">
      <img src={logo} alt="logo"/>
      <h1>IIIC UMIT</h1>
      
    </div>
    <div className="footer-content">
    <div className="footer-section footer-social-media">
    <h2>Follow Us</h2>
    <div className="footer-social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <img src={Facebook} alt="Facebook"/>
        </a>
        <a href="https://www.twitter.com" target="_blank"  rel="noopener noreferrer" className="footer-social-icon">
            <img src={Twitter} alt="Twitter"/>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <img src={LinkedIn} alt="LinkedIn"/>
        </a>
        <a href="https://www.instagram.com" target="_blank"  rel="noopener noreferrer" className="footer-social-icon">
            <img src={Instagram} alt="Instagram"/>
        </a>
    </div>
</div>

<div className="footer-section links">
  <h2>Quick Links</h2>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About Us</Link></li>
    <li><Link to="/contact">Contact</Link></li>
    <li><Link to="/events">Events</Link></li>
  </ul>
</div>
    <div className="footer-section contact">
      <h2>Connect</h2>
      <p>Email: placement@college.edu</p>
      <p>Phone: +123 456 7890</p>
      <p>Address: 123 College Street, City, Country</p>
      <p>Contact Us</p>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 Training and Placement Cell. All Rights Reserved.</p>
  </div>
</footer>

        </div>
    );
};
export default Home;
