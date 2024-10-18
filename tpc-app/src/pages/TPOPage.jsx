import React, { useState } from 'react';
import logo from '../assests/images/output-onlinepngtools.png';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import  '../styles/TPOPage.css'

const TPOPage = () => {
  const [resources, setResources] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [resourceFile, setResourceFile] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state

  const handleResourceUpload = (e) => {
    e.preventDefault();
    if (resourceFile) {
      setResources([...resources, resourceFile]);
      setResourceFile(null);
    }
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (announcementText) {
      setAnnouncements([...announcements, announcementText]);
      setAnnouncementText('');
    }
  };

  const handleViewData = () => {
    alert(`Resources: ${resources.map((r) => r.name).join(', ')}\nAnnouncements: ${announcements.join(', ')}`);
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {sidebarOpen ? 'Collapse' : 'Expand'}
        </button>
        <ul className="sidebar-links">
          <li><Link to="/ManageStudents">Manage Student</Link></li>
          <li><Link to="/manageRecruiter">Manage Recruiter</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default TPOPage;
