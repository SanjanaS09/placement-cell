import React from "react";
import firebase from 'firebase/compat/app';
import { Outlet, useNavigate } from "react-router-dom";

const TPOHOME = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = async () => {
        try {
          await firebase.auth().signOut();
          navigate('/login'); // Redirect to the login page after successful sign out
        } catch (error) {
          console.error('Error signing out: ', error);
          // Handle any sign out errors here, maybe show an alert
        }
      };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">TPO Dashboard</h2>
                <nav className="flex flex-col space-y-4">
                    <button
                        className="sidebarButton"
                        onClick={() => handleNavigation("/TPOPage")}
                    >
                        Home
                    </button>
                    <button
                        className="sidebarButton"
                        onClick={() => handleNavigation("/TPOPage/StudentDetailsDashboard")}
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
                    <button className="sidebarButton bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                        Sign Out
                    </button>
                </nav>
            </div>

            <div className="outletContainer">
                <Outlet />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
                <h1 className="text-3xl font-bold">Welcome to the TPO Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage students, recruiters, and more from here.</p>
            </div>
        </div>
    );
};

export default TPOHOME;

