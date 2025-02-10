import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "../styles/ManageRecruiter.css";

const ManageRecruiter = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const auth = firebase.auth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedInUser(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRecruiters = async () => {
      const snapshot = await firebase.database().ref("Recruiters").once("value");
      const data = snapshot.val();
      const recruiterArray = data
        ? Object.entries(data).map(([key, value]) => ({ key, ...value }))
        : [];
      setRecruiters(recruiterArray);
    };
    fetchRecruiters();
  }, []);

  const handleRowClick = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedRecruiter(null);
  };

  const handleBlacklistCompany = (recruiterKey, companyName) => {
    if (!loggedInUser) {
      alert("No logged-in user.");
      return;
    }

    firebase.database().ref(`Recruiters/${recruiterKey}`).update({
      isBlacklisted: true
    }).then(() => {
      console.log(`${companyName} has been blacklisted.`);
      setRecruiters((prevRecruiters) => 
        prevRecruiters.map(recruiter => 
          recruiter.key === recruiterKey ? { ...recruiter, isBlacklisted: true } : recruiter
        )
      );
    });
  };

  const handlePostToStudentPage = (recruiterKey, companyName) => {
    if (!loggedInUser) {
      alert("No logged-in user.");
      return;
    }

    firebase.database().ref(`Recruiters/${recruiterKey}`).update({
      postRecruitmentStatus: true
    }).then(() => {
      console.log(`${companyName} details posted to student page.`);
      setRecruiters((prevRecruiters) => 
        prevRecruiters.map(recruiter => 
          recruiter.key === recruiterKey ? { ...recruiter, postRecruitmentStatus: true } : recruiter
        )
      );
    });
  };

  return (
    <div className="tpo-container">
      <div className="recruiter-section">
        <h2>Recruiter Details</h2>
        <table className="recruiter-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Internship Title</th>
              <th>Internship Description</th>
              <th>Remote/On-Site</th>
              <th>Employment Type</th>
              <th>Job Title</th>
              <th>Job Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((recruiter) => (
              <tr key={recruiter.key} onClick={() => handleRowClick(recruiter)}>
                <td>{recruiter.company_name}</td>
                <td>{recruiter.internship?.internship_title || "N/A"}</td>
                <td>{recruiter.internship?.internship_description || "N/A"}</td>
                <td>{recruiter.internship?.remote_on_site || "N/A"}</td>
                <td>{recruiter.internship?.type_of_employment || "N/A"}</td>
                <td>{recruiter.placement?.job_title || "N/A"}</td>
                <td>{recruiter.placement?.jobLocation || "N/A"}</td>
                <td>
                  <button 
                    className="action-button blacklist-btn" 
                    onClick={(e) => { e.stopPropagation(); handleBlacklistCompany(recruiter.key, recruiter.company_name); }}>
                    Blacklist
                  </button>
                  <button 
                    className="action-button post-btn" 
                    onClick={(e) => { e.stopPropagation(); handlePostToStudentPage(recruiter.key, recruiter.company_name); }}>
                    Post
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && selectedRecruiter && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <h3>Company Details</h3>
            <p><strong>Company Name:</strong> {selectedRecruiter.company_name}</p>
            <p><strong>Internship Title:</strong> {selectedRecruiter.internship?.internship_title || "N/A"}</p>
            <p><strong>Internship Description:</strong> {selectedRecruiter.internship?.internship_description || "N/A"}</p>
            <p><strong>Remote/On-Site:</strong> {selectedRecruiter.internship?.remote_on_site || "N/A"}</p>
            <p><strong>Type of Employment:</strong> {selectedRecruiter.internship?.type_of_employment || "N/A"}</p>
            <p><strong>Job Title:</strong> {selectedRecruiter.placement?.job_title || "N/A"}</p>
            <p><strong>Job Location:</strong> {selectedRecruiter.placement?.jobLocation || "N/A"}</p>
            <p><strong>Job Description:</strong> {selectedRecruiter.placement?.job_desc || "N/A"}</p>
            <p><strong>Eligibility Criteria:</strong> {selectedRecruiter.internship?.eligibility_criteria?.required_qualifications || "N/A"}</p>
            <p><strong>Additional Benefits:</strong> {selectedRecruiter.internship?.ctcAndBreakup?.additional_benefits || "N/A"}</p>
            <p><strong>Selection Process:</strong> {selectedRecruiter.placement?.selection_process?.recruitment_stages?.join(", ") || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRecruiter;

