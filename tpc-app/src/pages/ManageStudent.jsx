import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import '../styles/ManageStudent.css';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  const fetchStudentData = useCallback(async () => {
    const studentRef = firebase.database().ref("Students");
    studentRef.once("value", (snapshot) => {
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        const studentsList = [];
        const yearSet = new Set();
        const branchSet = new Set();

        Object.keys(studentData).forEach((year) => {
          yearSet.add(year);
          Object.keys(studentData[year]).forEach((branch) => {
            branchSet.add(branch);
            Object.keys(studentData[year][branch]).forEach((studentId) => {
              const studentInfo = studentData[year][branch][studentId];
              studentsList.push({
                year,
                branch,
                ...studentInfo,
              });
            });
          });
        });

        setStudents(studentsList);
        setYears([...yearSet]);
        setBranches([...branchSet]);
      }
    });
  }, []);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const filteredStudents = students
    .filter((student) => (yearFilter ? student.year === yearFilter : true))
    .filter((student) => (branchFilter ? student.branch === branchFilter : true));

  return (
    <div>
      <h1>Manage Students</h1>

      <div>
        <h3>Filter Students</h3>
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
              <th>CGPA</th>
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
                <td>{student.cgpa || "N/A"}</td>
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
