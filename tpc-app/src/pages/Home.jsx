import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Home.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assests/images/output-onlinepngtools.png';
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
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend, ArcElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend, ArcElement, LineElement);

function Home() {
  const navigate = useNavigate();
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
    labels: ['Oracle', 'Deutsche Bank PPO', 'JP Morgan Chase & Co. PPO', 'Barclays PPO (Pune)', 'VISA', 'Colgate Palmolive Internship'],
    datasets: [{
      label: '# of Placements',
      data: [1, 5, 1, 4, 4, 19, 1, 3, 2, 2, 5, 7, 16, 1, 34, 7, 14, 2, 4, 1, 4, 12, 5, 2, 1, 9, 2, 19,],
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
            <h1>Welcome To <br />Usha Mittal Institute of Technology</h1>
            <p> Empowering Women in Engineering: Where Innovation Meets Excellence.</p>
          </div>
          <div className="login-buttons">
            <button onClick={() => navigate('/StudentLogin')} className="custom-btn btn-1">Student</button>
            <button onClick={() => navigate('/RecruiterLogin')} className="custom-btn btn-1">Recruiters</button>
            <button onClick={() => navigate('/TPOLogin')} className="custom-btn btn-1"><span>TPO</span></button>
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
            <h3>John Doe</h3>
            <p>"I am excited to start my journey at Google. The experience and learning at college prepared me well!"</p>
            <p><strong>Package:</strong> $120,000</p>
            <p><strong>Company:</strong> Google</p>
          </div>
        </div>
        <div className="student-card">
          <img src={JaneSmith} alt="Student 2" className="student-photo" />
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
        <div className="slider-text"><h1><b>Our Industry Recruiters</b></h1></div>
        <div className="slide-track">
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/thumbs/2x/mcdonalds-black-logo.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-black-and-white.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-black-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/nfl-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-6-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/hogwarts-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/thumbs/2x/mcdonalds-black-logo.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-black-and-white.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-black-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/nfl-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-6-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/hogwarts-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/thumbs/2x/mcdonalds-black-logo.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-black-and-white.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-black-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/nfl-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-6-logo-png-transparent.png" alt="" />
          </div>
          <div className="slide">
            <img className="move" src="https://cdn.freebiesupply.com/logos/large/2x/hogwarts-logo-png-transparent.png" alt="" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-title">
          <img src={logo} alt="logo" />
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
            <p>Address: 123 College Street, City, Country</p>
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
