// ContactUs.jsx
import React from 'react';
import '../styles/contactus.css'; 

const ContactUs = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <img src="img/logo/logo.png" alt="Logo" />
        </div>
        <ul className="navLinks">
          <li><a href="index.html">Home</a></li>
          <li><a href="index.html">About</a></li>
          <li><a href="contactus.html">Contact</a></li>
        </ul>
      </nav>

      <section className="chairperson">
        <h2>Chairperson</h2>
        <div className="profile">
          <img src="image/coordinator.jpeg" alt="John Smith" />
          <div className="details">
            <h3>John Smith</h3>
            <p>Professor of Business Management</p>
            <p><strong>Email:</strong> <a href="mailto:john.smith@university.edu">john.smith@university.edu</a></p>
            <p><strong>Secretary Name:</strong> Emily Johnson</p>
            <p><strong>Secretary Email:</strong> <a href="mailto:emily.johnson@university.edu">emily.johnson@university.edu</a></p>
            <p><strong>Secretary Phone:</strong> 123-456-7890</p>
          </div>
        </div>
      </section>

      <section className="manager">
        <h2>Assistant General Manager-Placement</h2>
        <div className="profile">
          <div className="details">
            <h3>Jane Doe</h3>
            <p>Assistant General Manager of Placement Office</p>
            <p><strong>Email:</strong> <a href="mailto:jane.doe@university.edu">jane.doe@university.edu</a></p>
            <p><strong>Office Phone:</strong> 234-567-8901</p>
          </div>
        </div>
      </section>

      <section className="staff">
        <h2>Staff</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Email</th>
              <th>Office Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Michael Brown</td>
              <td>Assistant Manager</td>
              <td>Placement Office</td>
              <td>michael.brown@university.edu</td>
              <td>345-678-9012</td>
            </tr>
            <tr>
              <td>Linda Green</td>
              <td>Assistant Manager</td>
              <td>Placement Office</td>
              <td>linda.green@university.edu</td>
              <td>456-789-0123</td>
            </tr>
            <tr>
              <td>David White</td>
              <td>Executive</td>
              <td>Placement Office</td>
              <td>david.white@university.edu</td>
              <td>567-890-1234</td>
            </tr>
            <tr>
              <td>Alice Black</td>
              <td>Coordinator</td>
              <td>Placement Office</td>
              <td>alice.black@university.edu</td>
              <td>678-901-2345</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="committee">
        <h2>Student Placement Committee Members 2024</h2>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Robert Davis</td>
              <td>Recruitment Secretary</td>
              <td>robert.davis@university.edu</td>
              <td>789-012-3456</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jessica Moore</td>
              <td>Elected Placement Coordinator</td>
              <td>jessica.moore@university.edu</td>
              <td>890-123-4567</td>
            </tr>
            <tr>
              <td>3</td>
              <td>William Johnson</td>
              <td>Elected Placement Coordinator</td>
              <td>william.johnson@university.edu</td>
              <td>901-234-5678</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ContactUs;
