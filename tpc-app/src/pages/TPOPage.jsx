import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/sndt-logo.png"; // Replace with your logo path
import "../styles/TPOPage.css"; // Add appropriate styles for the TPO dashboard

const TPODashboard = ({ userData }) => {
  const [sideBar, setSideBar] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setSideBar(false);
  };

  return (
    <>
      {userData && userData.Status === "Enabled" && (
        <div className="dashboardContainer">
          {/* Navbar */}
          <nav className="dashboardNavbar">
            <img src={logo} alt="logo" className="navbarLogo" />
            <div className="dashboardContent">
              <div className="username">{userData.Name}</div>
              <div
                className="sidebarControl"
                onClick={() => setSideBar(!sideBar)}
              >
                <svg
                  width="40"
                  height="40"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#23370A"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
          </nav>

          {/* Outlet for sub-pages */}
          <div className="outletContainer">
            <Outlet />
          </div>

          {/* Sidebar */}
          <div className="sidebarContent">
            <div
              className={sideBar ? "sidebar sidebarOpen" : "sidebar sidebarClosed"}
            >
              <button
                className="sidebarButton"
                onClick={() => handleNavigation("/dashboard/Home")}
              >
                Home
              </button>
              <button
                className="sidebarButton"
                onClick={() => handleNavigation("/dashboard/ManageStudents")}
              >
                Manage Students
              </button>
              <button
                className="sidebarButton"
                onClick={() => handleNavigation("/dashboard/ManageRecruiter")}
              >
                Manage Recruiters
              </button>
              <button
                className="sidebarButton"
                onClick={() => handleNavigation("/dashboard/Resources")}
              >
                Resources
              </button>
              <button
                className="sidebarButton"
                onClick={() => handleNavigation("/dashboard/Announcements")}
              >
                Announcements
              </button>
              <button
                className="sidebarButton"
                onClick={() => {
                  // Perform logout functionality
                  navigate("/");
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TPODashboard;
