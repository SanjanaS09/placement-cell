import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const JobListings = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userYear, setUserYear] = useState(null);
  const [postings, setPostings] = useState([]);
  const [filteredPostings, setFilteredPostings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const userId = user.uid;
      setLoggedInUser(userId);

      try {
        const studentRef = await firebase.database().ref(`Students`).once("value");
        const studentData = studentRef.val();

        let foundUser = null;
        let passOutYear = null;

        // Search for the user in all pass-out years
        Object.keys(studentData).forEach((year) => {
          Object.keys(studentData[year]).forEach((branch) => {
            if (studentData[year][branch][userId]) {
              foundUser = studentData[year][branch][userId];
              passOutYear = year;
            }
          });
        });

        if (!foundUser) return;

        // Determine the student's current year
        const currentAcademicYear = "2024-2025";
        let studentYear = null;

        if (passOutYear === "May 2026") {
          studentYear = "3rd Year";
        } else if (passOutYear === "May 2025") {
          studentYear = "4th Year";
        }

        setUserYear(studentYear);
        fetchJobPostings(studentYear);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchJobPostings = async (studentYear) => {
    try {
      const recruiterRef = await firebase.database().ref("Recruiters").once("value");
      const recruiterData = recruiterRef.val();

      if (!recruiterData) return;

      let jobList = [];
      Object.values(recruiterData).forEach((recruiter) => {
        if (recruiter.postRecruitmentStatus === true) {
          if (studentYear === "3rd Year" && recruiter.internship) {
            jobList.push({
              title: recruiter.internship.internship_title,
              company: recruiter.company_name,
              stipend: recruiter.internship.ctcAndBreakup.stipend,
              location: recruiter.internship.remote_on_site,
              type: "Internship",
            });
          } else if (studentYear === "4th Year" && recruiter.placement) {
            jobList.push({
              title: recruiter.placement.job_title,
              company: recruiter.company_name,
              salary: recruiter.placement.ctcAndBreakup.salary,
              location: recruiter.placement.jobLocation,
              type: "Placement",
            });
          }
        }
      });

      setPostings(jobList);
      setFilteredPostings(jobList);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = postings.filter((job) =>
      job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query)
    );
    setFilteredPostings(filtered);
  };

  return (
    <div>
      <h2>Job Opportunities</h2>
      {userYear ? <p>You are in {userYear}</p> : <p>Loading...</p>}

      <input
        type="text"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {filteredPostings.length > 0 ? (
        <div>
          {filteredPostings.map((job, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <h3>{job.title} ({job.type})</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <p>Salary/Stipend: {job.salary || job.stipend}</p>
              <button>Apply</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No job postings available</p>
      )}
    </div>
  );
};

export default JobListings;
