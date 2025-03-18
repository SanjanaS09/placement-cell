import React from "react";
import firebase from "firebase/compat/app";
import { Outlet, useNavigate } from "react-router-dom";
import '../styles/TPODashboard.css';
// import logo from '../assets/logo.png'; // Import the logo if necessary

const StudentDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            navigate("/login");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <div className="dashboardContainer">
            <div className='sidebarContent'>
                <div className="sidebar">

                    {/* <img
                    src={logo}
                    alt="logo"
                    className="navbarLogo"
                    onClick={() => handleNavigation("/")}
                /> */}
                    <h3>Student Dashboard</h3>
                    <div className="flex flex-col space-y-4">
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/Dashboard")}
                        >
                            Home
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/Profile")}
                        >
                            Profile
                        </button>
                        {/* <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/Resume")}
                        >
                           Resume
                        </button> */}
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/Resources")}
                        >
                            Resources
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/JobPosting")}
                        >
                            Job Posting
                        </button>
                        {/* <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/Profile")}
                        >
                            Announcements
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/Student/Profile")}
                        >
                            Event Dashboard
                        </button> */}
                        <button className="sidebarButton" onClick={handleLogout}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="outletContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default StudentDashboard;
