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
import AboutUs from "../assets/images/AboutUs.PNG"
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
          {/* <div className="logo">
            <img src={logo} alt="Logo" />
          </div> */}
          <div className="nav-links">
            <button onClick={() => navigate('/Contactus')} className="nav-button">Contact</button>
          </div>
        </nav>

        {/* HOME */}
        <div className="home-section">
          <div className="welcome-message">
            <h1>
              <span className="offset-header offset-header-odd"><span>Welcome To </span></span><br />
              <span className="offset-header offset-header-even"><span>Industry Institute Interaction Cell</span></span>
            </h1>
            <p> Empowering Women in Engineering: Where Innovation Meets Excellence.</p>
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
          <div className="login-buttons">
            <button onClick={() => handleRoleSelect('Student')}>
            <svg fill="#FFFFFF" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 481.119 481.119" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="Layer_2_31_"> <g> <path d="M80.13,89.836c6.763,3.805,64.945,31.734,64.945,31.734s-0.016,30.356-0.016,38.571 c0,105.197-43.24,115.07-31.602,123.201c2.563,1.789,33.903,2.949,73.783,3.484c14.103,9.342,32.798,15.057,53.318,15.133 c20.521-0.076,39.216-5.791,53.318-15.133c39.88-0.535,71.221-1.695,73.782-3.484c11.641-8.131-31.6-18.004-31.6-123.201 c0-8.215-0.016-38.57-0.016-38.57s26.062-12.512,45.329-21.928v44.448c-3.342,1.97-5.689,5.452-5.689,9.603 c0,3.674,1.864,6.788,4.583,8.846c0,0-4.832,27.166-6.395,35.154c-1.563,7.988,27.559,6.387,26.247,0 c-1.311-6.387-6.394-35.154-6.394-35.154c2.719-2.058,4.585-5.172,4.585-8.846c0-4.15-2.339-7.633-5.679-9.603V94.104 c4.084-2.029,7.104-3.563,8.355-4.268c6.763-3.807,7.763-9.605-1.862-14.318C360.155,56.442,260.8,7.817,250.976,3.131 C246.877,1.178,243.474,0.268,240.56,0c-2.914,0.268-6.318,1.178-10.416,3.131c-9.824,4.686-109.18,53.311-148.151,72.387 C72.368,80.231,73.368,86.03,80.13,89.836z"></path> <path d="M353.227,343.084c-15.685-5.656-42.989-21.961-47.666-24.477c-1.213-0.705-2.616-1.117-4.121-1.117 c-3.282,0-6.105,1.928-7.423,4.715c-12.888,21.572-36.735,84.145-53.457,85.754c-16.722-1.609-40.57-64.182-53.457-85.754 c-1.316-2.787-4.14-4.715-7.423-4.715c-1.504,0-2.908,0.412-4.121,1.117c-4.677,2.516-31.981,18.82-47.666,24.477 c-52.65,18.984-76.33,38.346-76.33,51.547c0,13.188,0,86.488,0,86.488H240.56h188.997c0,0,0-73.301,0-86.488 C429.557,381.43,405.877,362.069,353.227,343.084z"></path> </g> </g> </g> </g></svg>
            Student</button>
            <button onClick={() => handleRoleSelect('Recruiter')}>
             <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve" stroke="#ffffff" width="30px" height="30px"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M37.3,31.9h21.8c1.1,0,2-0.9,2-2v-4c0-3.3-2.7-5.9-5.9-5.9H41.3c-3.3,0-5.9,2.7-5.9,5.9v4 C35.3,31,36.2,31.9,37.3,31.9z"></path> <path d="M70,24.9h-2c-0.6,0-1,0.4-1,1v4c0,4.4-3.6,7.9-7.9,7.9H37.3c-4.4,0-7.9-3.6-7.9-7.9v-4c0-0.6-0.4-1-1-1h-2 c-3.3,0-5.9,2.7-5.9,5.9v40.6c0,3.3,2.7,5.9,5.9,5.9h20c2.8,0,3.1-2.3,3.1-3.1V52.8c0-2.3,1.3-2.8,2-2.8h21.6c2.4,0,2.8-2.1,2.8-2.8 V31C76,27.6,73.3,24.9,70,24.9z"></path> <path d="M78.4,60.4H56.6c-0.6,0-1.1-0.5-1.1-1.1v-2.2c0-0.6,0.5-1.1,1.1-1.1h21.8c0.6,0,1.1,0.5,1.1,1.1v2.2 C79.5,59.9,79,60.4,78.4,60.4z M78.4,70.2H56.6c-0.6,0-1.1-0.5-1.1-1.1v-2.2c0-0.6,0.5-1.1,1.1-1.1h21.8c0.6,0,1.1,0.5,1.1,1.1v2.2 C79.5,69.7,79,70.2,78.4,70.2z M78.4,80H56.6c-0.6,0-1.1-0.5-1.1-1.1v-2.2c0-0.6,0.5-1.1,1.1-1.1h21.8c0.6,0,1.1,0.5,1.1,1.1v2.2 C79.5,79.5,79,80,78.4,80z"></path> </g></svg>
            Recruiter</button>
            <button onClick={() => handleRoleSelect('Coordinator')}>Coordinator</button>
          </div>
        </div>

        {/* COMPANY LOGO */}
        <div className="slider">
          <div className="slider-text">
            <h1><b>Our Industry Recruiters</b></h1>
          </div>
          <div className="slide-track">
            {logos.concat(logos).concat(logos).map((logo, index) => ( // Duplicate logos for smooth scrolling
              <div className="slide" key={index}>
                <img className="move" src={logo} alt={`Company Logo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        {/* ABOUT US */}
        <div className="about-container">
            <div className='about-content'>
          <h1>About Us</h1>
          <p>
          The Industry-Institute Interaction Cell (IIIC), UMIT is dedicated to enhancing student employability by bridging the gap between academia and industry. We strive to equip students with the necessary skills, knowledge, and exposure to excel in the corporate world.
          Our initiatives include placement drives, internships, workshops, mock interviews, and industry interactions to prepare students for real-world challenges. We collaborate with top companies to provide career opportunities, resume-building support, and technical & soft skills training.
          </p>
          </div>
          <div className='aboutImg'>
            <img src={AboutUs} alt="AboutUS" />
          </div>
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
                {/* <li><Link to="/about">About Us</Link></li> */}
                <li><Link to="/Contactus">Contact</Link></li>
                <li><Link to="/Events">Events</Link></li>
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
