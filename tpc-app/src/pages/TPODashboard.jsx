import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { Outlet, useNavigate } from "react-router-dom";
import '../styles/TPODashboard.css';
// import logo from '../assets/logo.png'; // Import the logo if necessary

const TPODashboard = () => {
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

            {/* <img
                    src={logo}
                    alt="logo"
                    className="navbarLogo"
                    onClick={() => handleNavigation("/")}
                /> */}
            <div className='sidebarContent'>
                {/* Sidebar */}
                <div className="sidebar">
                    <h2>TPO Dashboard</h2>
                    <div className="flex flex-col space-y-4">
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage")}
                        >
                            Home
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage/StudentDetails")}
                        >
                            Student Details Dashboard
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage/ManageStudent")}
                        >
                            Manage Students
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage/ManageRecruiter")}
                        >
                            Manage Recruiters
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage/Blog")}
                        >
                            Resources
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage/Announcements")}
                        >
                            Announcements
                        </button>
                        <button
                            className="sidebarButton"
                            onClick={() => handleNavigation("/TPOPage/EventDashboard")}
                        >
                            Event Dashboard
                        </button>
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

export default TPODashboard;
