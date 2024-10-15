import React from 'react';
import logo from '../assests/images/output-onlinepngtools.png';

function StudentPage(){
    return (
        <div>
            {/* NAVBAR */}
            <nav className="nav">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="/Recruitment Oppurunity">Recruitment Oppurunity</a></li>
                    <li><a href="/Resources">Resources</a></li>
                    <li><a href="/Profile">Profile</a></li>
                </ul>
            </nav>
        <div className="student-page">
            
        </div>
        </div>
    );
}
export default StudentPage