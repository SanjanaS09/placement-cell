// import React, { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import logo from "../assets/images/sndt-logo.png"; // Replace with your logo path
// import "../styles/TPOPage.css"; // Add appropriate styles for the TPO dashboard

// const TPOPage = ({ userData }) => {
//   const [sideBar, setSideBar] = useState(true);
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//     setSideBar(false);
//   };

//   return (
//     <>
//       {userData && userData.Status === "Enabled" && (
//         <div className="dashboardContainer">
//           {/* Navbar */}
//           <nav className="dashboardNavbar">
//             <img src={logo} alt="logo" className="navbarLogo" />
//             <div className="dashboardContent">
//               <div className="username">{userData.Name}</div>
//               <div
//                 className="sidebarControl"
//                 onClick={() => setSideBar(!sideBar)}
//               >
//                 <svg
//                   width="40"
//                   height="40"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="none"
//                     stroke="#23370A"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </nav>

//           {/* Outlet for sub-pages */}
//           <div className="outletContainer">
//             <Outlet />
//           </div>

//           {/* Sidebar */}
//           <div className="sidebarContent">
//             <div
//               className={sideBar ? "sidebar sidebarOpen" : "sidebar sidebarClosed"}
//             >
//               <button
//                 className="sidebarButton"
//                 onClick={() => handleNavigation("/dashboard/Home")}
//               >
//                 Home
//               </button>
//               <button
//                 className="sidebarButton"
//                 onClick={() => handleNavigation("/TPOPage/ManageStudents")}
//               >
//                 Manage Students
//               </button>
//               <button
//                 className="sidebarButton"
//                 onClick={() => handleNavigation("/dashboard/ManageRecruiter")}
//               >
//                 Manage Recruiters
//               </button>
//               <button
//                 className="sidebarButton"
//                 onClick={() => handleNavigation("/dashboard/Resources")}
//               >
//                 Resources
//               </button>
//               <button
//                 className="sidebarButton"
//                 onClick={() => handleNavigation("/dashboard/Announcements")}
//               >
//                 Announcements
//               </button>
//               <button
//                 className="sidebarButton"
//                 onClick={() => {
//                   // Perform logout functionality
//                   navigate("/");
//                 }}
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TPOPage;


// import React, { useState, useEffect } from "react";  
// import firebase from "firebase/compat/app";
// import "firease/compat/database";
// import "../styles/TPOPage.css";

// const TPOPage = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState("");
//   const [recruiters, setRecruiters] = useState([]);
  

//   const postAnnouncement = () => {
//     if (newAnnouncement) {
//       setAnnouncements([...announcements, newAnnouncement]);
//       setNewAnnouncement("");
//     }
//   };

//   useEffect(() => {
//     const recruitersRef = ref(database, "Recruiters");
//     onValue(recruitersRef, (snapshot) => {
//       const data = snapshot.val();
//       setRecruiters(data ? Object.values(data) : []);
//     });
//   }, []);
  

//   return (
//     <div className="tpo-container">
//       <h1>Training & Placement Officer Page</h1>

//       <div className="announcement-section">
//         <h2>Post Announcement</h2>
//         <textarea
//           value={newAnnouncement}
//           onChange={(e) => setNewAnnouncement(e.target.value)}
//           placeholder="Enter announcement here"
//         />
//         <button onClick={postAnnouncement}>Post</button>
//         <div className="announcement-list">
//           {announcements.map((announcement, index) => (
//             <p key={index}>{announcement}</p>
//           ))}
//         </div>
//       </div>

      


//   <div className="recruiter-section">
//         <h2>Recruiter Details</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Company Name</th>
//               <th>Internship Title</th>
//               <th>Internship Description</th>
//               <th>Remote/On-Site</th>
//               <th>Employment Type</th>
//               <th>Job Title</th>
//               <th>Job Description</th>
//               <th>Job Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recruiters.map((recruiter, index) => (
//               <tr key={index}>
//                 <td>{recruiter.company_name}</td>
//                 <td>{recruiter.internship?.internship_title || "N/A"}</td>
//                 <td>{recruiter.internship?.internship_description || "N/A"}</td>
//                 <td>{recruiter.internship?.remote_on_site || "N/A"}</td>
//                 <td>{recruiter.internship?.type_of_employment || "N/A"}</td>
//                 <td>{recruiter.placement?.job_title || "N/A"}</td>
//                 <td>{recruiter.placement?.job_desc || "N/A"}</td>
//                 <td>{recruiter.placement?.jobLocation || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       </div>);
// };


// export default TPOPage;


import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import "../styles/TPOPage.css";

const TPOPage = () => {
  const [recruiterData, setRecruiterData] = useState(null);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recruiterSnapshot = await getDocs(collection(db, "recruiters"));
        const studentSnapshot = await getDocs(collection(db, "students"));

        const recruiterInfo = recruiterSnapshot.docs.map(doc => doc.data())[0];
        const studentInfo = studentSnapshot.docs.map(doc => doc.data())[0];

        setRecruiterData(recruiterInfo);
        setStudentData(studentInfo);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  if (!recruiterData || !studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tpo-container">
      <h1>Training and Placement Office</h1>
      
      <div className="recruiter-section">
        <h2>Recruiter Information</h2>
        <img src={recruiterData.photograph} alt="Recruiter" className="profile-pic" />
        <p><strong>Selection Process:</strong> {recruiterData.selection_process}</p>
        <p><strong>Expected Timeline:</strong> {recruiterData.expected_timeline}</p>
        <p><strong>Type of Employment:</strong> {recruiterData.type_of_employment}</p>
        <h3>Recruitment Stages:</h3>
        <ul>
          {recruiterData.recruitment_stages.map((stage, index) => (
            <li key={index}>{stage}</li>
          ))}
        </ul>
      </div>

      <div className="student-section">
        <h2>Student Information</h2>
        <p><strong>PNR No:</strong> {studentData.pnrNo}</p>
        <p><strong>Roll No:</strong> {studentData.rollNo}</p>
        <p><strong>Sex:</strong> {studentData.sex}</p>
        <p><strong>Telephone:</strong> {studentData.telephone}</p>
      </div>
    </div>
  );
};

export default TPOPage;
