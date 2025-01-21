import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database"; // Import Firebase Database
import '../styles/ManageStudent.css'

const ManageStudent = () => {
  const [announcement, setAnnouncement] = useState("");
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [tenureFilter, setTenureFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const database = firebase.database(); // Initialize Firebase Database

  const fetchStudentData = useCallback(async () => {
    const studentRef = database.ref("students/");
    studentRef.once("value", (snapshot) => {
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        const studentsList = [];
        const tenureList = [];
        const yearSet = new Set();
        const branchSet = new Set();

        Object.keys(studentData).forEach((tenure) => {
          tenureList.push(tenure);
          Object.keys(studentData[tenure]).forEach((year) => {
            yearSet.add(year);
            Object.keys(studentData[tenure][year]).forEach((branch) => {
              branchSet.add(branch);
              const branchStudents = studentData[tenure][year][branch];
              if (typeof branchStudents === "object") {
                Object.keys(branchStudents).forEach((studentName) => {
                  const studentInfo = branchStudents[studentName];
                  studentsList.push({
                    name: studentName,
                    branch: branch,
                    year: year,
                    tenure: tenure,
                    ...studentInfo, // Includes additional student info
                  });
                });
              }
            });
          });
        });

        setStudents(studentsList);
        setTenures(tenureList);
        setYears([...yearSet]);
        setBranches([...branchSet]);
      }
    });
  }, [database]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const handleUploadAnnouncement = () => {
    const announcementId = new Date().getTime();
    database.ref(`announcements/${announcementId}`).set({
      announcementText: announcement,
      createdOn: new Date().toLocaleString(),
    });
    alert("Announcement Uploaded!");
    setAnnouncement("");
  };

  const filteredStudents = students
    .filter((student) => (tenureFilter ? student.tenure === tenureFilter : true))
    .filter((student) => (yearFilter ? student.year === yearFilter : true))
    .filter((student) => (branchFilter ? student.branch === branchFilter : true));

  return (
    <div>
      <h1>Manage Students</h1>

      {/* Post Announcement */}
      <div className="manage-box">
        <h3>Post Announcement</h3>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Write an announcement here..."
        />
        <button onClick={handleUploadAnnouncement}>Post Announcement</button>
      </div>

      {/* Filter and Display Students */}
      <div>
        <h3>Filter Students</h3>

        {/* Tenure Filter */}
        <label>
          Tenure:
          <select onChange={(e) => setTenureFilter(e.target.value)}>
            <option value="">All Tenures</option>
            {tenures.map((tenure, index) => (
              <option key={index} value={tenure}>
                {tenure}
              </option>
            ))}
          </select>
        </label>

        {/* Year Filter */}
        <label>
          Year:
          <select onChange={(e) => setYearFilter(e.target.value)}>
            <option value="">All Years</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        {/* Branch Filter */}
        <label>
          Branch:
          <select onChange={(e) => setBranchFilter(e.target.value)}>
            <option value="">All Branches</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>

        <h3>Student Data</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Tenure</th>
              <th>CGPA</th>
              <th>PNR No</th>
              <th>Email</th>
              <th>LinkedIn</th>
              <th>GitHub</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Photograph</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
                <td>{student.tenure}</td>
                <td>{student.CGPA || "N/A"}</td>
                <td>{student.pnrNo || "N/A"}</td>
                <td>{student.email || "N/A"}</td>
                <td>
                  {student.linkedinLink ? (
                    <a href={student.linkedinLink} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {student.githubLink ? (
                    <a href={student.githubLink} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{student.address || "N/A"}</td>
                <td>{student.dob || "N/A"}</td>
                <td>
                  {student.photograph ? (
                    <img src={student.photograph} alt="Student" width="50" />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudent;
