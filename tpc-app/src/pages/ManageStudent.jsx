import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Import Firebase Database

const ManageStudents = () => {
  const [announcement, setAnnouncement] = useState('');
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [tenures, setTenures] = useState([]); // Tenure state
  const [tenureFilter, setTenureFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const database = firebase.database(); // Initialize Firebase Database

  // Fetch student data and available tenures, branches, and years
  const fetchStudentData = useCallback(async () => {
    const studentRef = database.ref('students/');
    studentRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        const studentsList = [];
        const tenureList = [];
        const yearSet = new Set();
        const branchSet = new Set();

        // Traverse the data to populate tenure, branch, and year
        Object.keys(studentData).forEach((tenure) => {
          tenureList.push(tenure); // Collect all tenures (e.g., "2024-25", "2025-26")
          Object.keys(studentData[tenure]).forEach((year) => {
            yearSet.add(year); // Collect unique years (e.g., "2nd", "3rd")
            Object.keys(studentData[tenure][year]).forEach((branch) => {
              branchSet.add(branch); // Collect unique branches
              const branchStudents = studentData[tenure][year][branch];
              if (typeof branchStudents === 'object') {
                Object.keys(branchStudents).forEach((studentName) => {
                  const studentInfo = branchStudents[studentName];
                  studentsList.push({
                    name: studentName,
                    branch: branch,
                    year: year,
                    tenure: tenure,
                    ...studentInfo, // Includes CGPA or other info
                  });
                });
              }
            });
          });
        });

        setStudents(studentsList); // Set the fetched student data
        setTenures(tenureList); // Set the available tenures
        setYears([...yearSet]); // Set available years
        setBranches([...branchSet]); // Set available branches
      }
    });
  }, [database]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const handleUploadAnnouncement = () => {
    const announcementId = new Date().getTime(); // Use timestamp as unique ID
    database.ref(`announcements/${announcementId}`).set({
      announcementText: announcement,
      createdOn: new Date().toLocaleString(),
    });
    alert('Announcement Uploaded!');
    setAnnouncement('');
  };

  // Filter students first by tenure, then by year, then by branch
  const filteredStudents = students
    .filter((student) => (tenureFilter ? student.tenure === tenureFilter : true))
    .filter((student) => (yearFilter ? student.year === yearFilter : true))
    .filter((student) => (branchFilter ? student.branch === branchFilter : true));

  return (
    <div>
      <h1>Manage Students</h1>

      {/* Post Announcement */}
      <div>
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
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
                <td>{student.tenure}</td>
                <td>{student.CGPA || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
