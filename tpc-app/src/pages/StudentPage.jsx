import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import logo from '../assets/images/sndt-logo.png';
import '../styles/StudentPage.css'

function StudentPage() {
    const [resume, setResume] = useState(null);

    const handleResumeUpload = (event) => {
        setResume(event.target.files[0]);
    };

    const handleResumeSubmit = (event) => {
        event.preventDefault();
        if (resume) {
            alert(`Resume ${resume.name} uploaded successfully!`);
        } else {
            alert('Please select a resume to upload!');
        }
    };
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
                    <li><button
                        className="signout-btn"
                        onClick={() => {
                            firebase.auth().signOut()
                            .then(() => {
                                window.location.href = "/Login"; // Redirect to login page after sign out
                            })
                            .catch((error) => {
                                console.error("Error during sign-out:", error);
                                alert("Failed to sign out. Please try again.");
                            });
                        }}
                    >
                        Signout
                    </button></li>
                </ul>
            </nav>
            <div className="student-page">

                <h1>Welcome, Student!</h1>

                <section className="announcements">
                    <h2>Announcements</h2>
                    <ul>
                        <li>Placement Drive on 25th October, 2024.</li>
                        <li>Workshop on Resume Building - 18th October, 2024.</li>
                        <li>New Internship Opportunities posted. Check now!</li>
                    </ul>
                </section>

                <section className="resume-upload">
                    <h2>Upload Your Resume</h2>
                    <form onSubmit={handleResumeSubmit}>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                        <button type="submit">Upload Resume</button>
                    </form>
                </section>

                <section className="opportunities">
                    <h2>Upcoming Opportunities</h2>
                    <ul>
                        <li>Amazon - Software Developer Internship</li>
                        <li>Google - Data Analyst Position</li>
                        <li>Infosys - Full Stack Developer Role</li>
                    </ul>
                </section>
            </div>
        </div>

    );
}
export default StudentPage