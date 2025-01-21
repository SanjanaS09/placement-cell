import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Home.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/sndt-logo.png';
import JohnDoe from "../assets/images/1.jpg";
import JaneSmith from "../assets/images/2.jpg";
import MikeJohnson from "../assets/images/3.jpg";
import ManIcon from "../assets/images/man-avatar-icon-free-vector.jpg";
import VilasSir from "../assets/images/vilasKharat.jpeg";
import LinkedIn from "../assets/images/linkedin.png";
import Facebook from "../assets/images/facebook.png";
import Instagram from "../assets/images/instagram.png";
import Twitter from "../assets/images/twitter.png";
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend, ArcElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend, ArcElement, LineElement);

const importAll = (requireContext) =>
  requireContext.keys().map(requireContext);

const logos = importAll(
  require.context("../assets/Company-logos", false, /\.(png|jpe?g|svg)$/)
);

function Home() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [counters, setCounters] = useState([
    { label: "Projects Completed", count: 156, value: 0 },
    { label: "Satisfied Clients", count: 227, value: 0 },
    { label: "Success Rate", count: 321, value: 0 },
    { label: "Years Experience", count: 254, value: 0 },
  ]);
  const [activated, setActivated] = useState(false);

  const updateCount = (index) => {
    setCounters(prevCounters => {
      const target = prevCounters[index].count;
      const currentCount = prevCounters[index].value;

      // Increment the current count towards the target
      if (currentCount < target) {
        return prevCounters.map((counter, i) => (
          i === index ? { ...counter, value: Math.min(currentCount + Math.ceil(target / 200), target) } : counter
        ));
      } else {
        return prevCounters; // No change if the count is already at the target
      }
    });
  };

  const handleScroll = useCallback(() => {
    if (!activated) {
      const containerPosition = document.querySelector('.container-counter').getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (containerPosition < screenPosition) {
        setActivated(true); // Prevent re-triggering
        counters.forEach((_, index) => {
          setCounters(prevCounters => {
            const newCounters = [...prevCounters];
            newCounters[index].value = 0; // Reset to 0 before counting up
            return newCounters;
          });
          updateCount(index);
        });
      }
    }
  }, [activated, counters]);

  useEffect(() => {
    const handleScrollEvent = () => handleScroll();
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [activated, counters, handleScroll]);

  useEffect(() => {
    if (activated) {
      const intervalId = setInterval(() => {
        setCounters(prevCounters => {
          return prevCounters.map((counter, index) => {
            const target = counter.count;
            if (counter.value < target) {
              return { ...counter, value: Math.min(counter.value + Math.ceil(target / 200), target) };
            }
            return counter;
          });
        });
      }, 20);

      return () => clearInterval(intervalId); // Clear interval on cleanup
    }
  }, [activated]);  // Ensure the dependency array is correct


  const barData = {
    labels: ['CST', 'CE', 'IT', 'DS', 'ENC'],
    datasets: [{
      label: 'Branch-wise Placements',
      data: [67, 69, 53, 17, 9],
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
    labels: ['Oracle', 'Deutsche Bank', 'JP Morgan Chase & Co.', 'Barclays', 'VISA', 'Colgate','GE Aerospace','Providence ','KPMG', 'Deloitte USI', 'Veritas', 'Bank of Americe', 'Deloitte IN', 'Seimens', 'NVIDIA', 'Rite Technologies', 'NetWeaver', 'Amdocs', 'Accenture', 'Publicis Sapient', 'HSBC', 'Capgemini', ' ExcelR', 'Argon & Co.','IIDE', 'Eduvaz','Clever Tap'],
    datasets: [{
      // label: '# of Placements',
      data: [1, 7, 2, 13, 4, 20, 3, 5, 9, 16, 1, 34, 14, 2, 5, 1, 4, 12, 5, 9, 2, 19, 2, 1, 10, 2, 1],
      backgroundColor: [
        // 'rgba(4, 4, 124, 0.7)',
        // 'rgba(36, 36, 164, 0.6)',
        // 'rgba(53, 53, 163, 0.5)',
        // 'rgba(105, 105, 182, 0.4)',
        // 'rgba(139, 139, 198, 0.3)'
        'rgba(4, 4, 124, 0.7)', 'rgba(36, 36, 164, 0.6)', 'rgba(53, 53, 163, 0.5)', 
        'rgba(105, 105, 182, 0.4)', 'rgba(139, 139, 198, 0.3)', 'rgba(4, 4, 124, 0.7)', 
        'rgba(36, 36, 164, 0.6)', 'rgba(53, 53, 163, 0.5)', 'rgba(105, 105, 182, 0.4)', 
        'rgba(139, 139, 198, 0.3)', 'rgba(4, 4, 124, 0.7)', 'rgba(36, 36, 164, 0.6)', 
        'rgba(53, 53, 163, 0.5)', 'rgba(105, 105, 182, 0.4)', 'rgba(139, 139, 198, 0.3)', 
        'rgba(4, 4, 124, 0.7)', 'rgba(36, 36, 164, 0.6)', 'rgba(53, 53, 163, 0.5)', 
        'rgba(105, 105, 182, 0.4)', 'rgba(139, 139, 198, 0.3)', 'rgba(4, 4, 124, 0.7)', 
        'rgba(36, 36, 164, 0.6)', 'rgba(53, 53, 163, 0.5)', 'rgba(105, 105, 182, 0.4)', 
        'rgba(139, 139, 198, 0.3)', 'rgba(4, 4, 124, 0.7)', 'rgba(36, 36, 164, 0.6)'
      ],
      borderColor: [
        // 'rgb(4, 4, 152, 1)',
        // 'rgb(4, 4, 152, 1)',
        // 'rgb(4, 4, 152, 1)',
        // 'rgb(4, 4, 152, 1)',
        // 'rgb(4, 4, 152, 1)'
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 
        'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)', 'rgb(4, 4, 152, 1)'
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

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Navigate to the login page and pass selectedRole as state
    navigate('/login', { state: { selectedRole: role } });
  };

  return (
    <div>
      <div className="home">
        {/* NAVBAR */}
        <nav className="nav">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/Contactus">Contact</a></li>
          </ul>
        </nav>

        {/* HOME */}
        <div className="home-section">
          <div className="welcome-message">
            <h1>
              <span className="offset-header offset-header-odd"><span>Welcome To </span></span><br />
              <span className="offset-header offset-header-even"><span>Industry Institute Interaction Cell</span></span>
            </h1>
            <p> Empowering Women in Engineering: Where Innovation Meets Excellence.</p>
          </div>
          <div className="login-buttons">
            <button onClick={() => handleRoleSelect('Student')}>Student</button>
            <button onClick={() => handleRoleSelect('Recruiter')}>Recruiter</button>
            <button onClick={() => handleRoleSelect('Coordinator')}>Coordinator</button>
          </div>
          <div className="social-media">
            <a href="https://in.linkedin.com/company/tpc-umit-sndt?trk=public_post_follow-view-profile" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={LinkedIn} alt="LinkedIn" />
            </a>
            <a href="https://www.instagram.com/iiic.umit/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={Facebook} alt="Facebook" />
            </a>
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
        <div className="container-counter">
          <div className="counters">
            <div>
              {counters.map((counter, index) => (
                <div className="counter" key={counter.label}>
                  <h1>{counter.value}</h1>
                  <h3>{counter.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <br /><br /><br /><br /><br /><br /> */}

        <div className="layout">
          <div className="charts-grid">
            <div className="chart-container">
              <h2>Branch-wise Placements</h2>
              <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>

            <div className="chart-container">
              <h2>Company-wise Placements</h2>
              <Doughnut data={doughnutData} width="200px" height="200px" />
            </div>

            <div className="chart-container">
              <h2>Top Companies Visiting</h2>
              <Bar data={horiBarData} options={{ indexAxis: 'y' }} />
            </div>

            <div className="chart-container">
              <h2>Yearly Placement Data</h2>
              <Line data={lineData} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>
          <div className='feed'>
            <div className="elfsight-app-bac7a5aa-fa12-4ca3-a6a3-1c24c5b793a0" data-elfsight-app-lazy></div>
            {/* Update Section */}
            <div className="update-section">
              <h2>Latest Announcements</h2>
              <ul>
                <li>Admission to M.Tech and PhD programs</li>
                <li>Faculty Recruitment 2024</li>
                <li>JRF Recruitment</li>
                <li>Internship Advertisement under ISEA Project</li>
              </ul>
            </div>
          </div>
        </div>

        {/* HIGHEST PLACED */}
        <section className="top-students">
          <div className="student-card">
            <img src={JohnDoe} alt="Student 1" className="student-photo" />
            <div className="student-info">
              <h3>Shruti Rane</h3>
              <p>"I am excited to start my journey at Visa. The experience and learning at college prepared me well!"</p>
              <p><strong>Package:</strong>INR 32,76,298 </p>
              <p><strong>Company:</strong>Visa</p>
            </div>
          </div>
          <div className="student-card">
            <img src={JaneSmith} alt="Student 2" className="student-photo" />
            <div className="student-info">
              <h3>Kirtee Sinha</h3>
              <p>"Joining Visa is a dream come true! Thanks to the placement cell for their guidance."</p>
              <p><strong>Package:</strong>INR 32,76,297</p>
              <p><strong>Company:</strong>Visa</p>
            </div>
          </div>
          <div className="student-card">
            <img src={MikeJohnson} alt="Student 3" className="student-photo" />
            <div className="student-info">
              <h3>Alam Sanjana</h3>
              <p>"I am thrilled to be part of Visa. The hard work has truly paid off!"</p>
              <p><strong>Package:</strong>INR 32,76,296</p>
              <p><strong>Company:</strong>Visa</p>
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

        {/* ------------COORDINATORS MESSAGE---------  */}
        <div className="message">
          <div className="coordinator-message">
            <img src={VilasSir} alt="Coordinator" className="coordinator-image" />
            <div className="message-content">
              <h2>Coordinator's Message</h2>
              <p id="message">Welcome to the placement cell. We are dedicated to providing our students with the best career opportunities. Our team is here to assist you in achieving your professional goals. We believe in creating a supportive environment that fosters growth and development.</p>
            </div>
          </div>
        </div>
        <script src="message.js"></script>

        {/* COMPANY LOGO */}
        <div className="slider">
          <div className="slider-text">
            <h1><b>Our Industry Recruiters</b></h1>
          </div>
          <div className="slide-track">
            {logos.map((logo, index) => (
              <div className="slide" key={index}>
                <img className="move" src={logo} alt={`Company Logo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <div className="footer-title">
            <img src={logo} alt="logo" width="150px" height="100px" />
            <h1>IIIC UMIT</h1>

          </div>
          <div className="footer-content">
            <div className="footer-section footer-social-media">
              <h2>Follow Us</h2>
              <div className="footer-social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={Facebook} alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={Twitter} alt="Twitter" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={LinkedIn} alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <img src={Instagram} alt="Instagram" />
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
              <p>Address: 3RPJ+H5Q, Juhu-Tara Road, Sir Vitthaldas Vidyavihar, Santacruz(W), Mumbai, Maharashtra 400049</p>
              <p>Contact Us</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Training and Placement Cell. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div >
  );
};
export default Home;
