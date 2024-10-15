import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; // Import Firebase Storage
import 'firebase/compat/database'; // Import Firebase Database
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const ManageStudents = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [blogText, setBlogText] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [students, setStudents] = useState([]);
  const [branchFilter, setBranchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const storage = firebase.storage(); // Initialize Firebase Storage
  const database = firebase.database(); // Initialize Firebase Database

  // Using useCallback to prevent re-creation of the function in each render
  const fetchStudentData = useCallback(async () => {
    const studentsRef = database.ref('students/');
    studentsRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
        setStudents(Object.values(snapshot.val()));
      }
    });
  }, [database]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]); // Adding fetchStudentData as a dependency

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUploadPdf = async () => {
    if (pdfFile) {
      const fileId = uuidv4();
      const fileRef = storage.ref(`resources/${fileId}-${pdfFile.name}`);
      await fileRef.put(pdfFile);
      const fileURL = await fileRef.getDownloadURL();

      database.ref(`resources/${fileId}`).set({
        fileURL,
        fileName: pdfFile.name,
        createdOn: new Date().toLocaleString(),
      });

      alert('PDF Uploaded Successfully!');
      setPdfFile(null);
    }
  };

  const handleUploadBlog = () => {
    const blogId = uuidv4();
    database.ref(`blogs/${blogId}`).set({
      blogText,
      createdOn: new Date().toLocaleString(),
    });
    alert('Blog Posted Successfully!');
    setBlogText('');
  };

  const handleUploadAnnouncement = () => {
    const announcementId = uuidv4();
    database.ref(`announcements/${announcementId}`).set({
      announcementText: announcement,
      createdOn: new Date().toLocaleString(),
    });
    alert('Announcement Uploaded!');
    setAnnouncement('');
  };

  const filteredStudents = students
    .filter((student) => (branchFilter ? student.branch === branchFilter : true))
    .filter((student) => (yearFilter ? student.year === yearFilter : true));

  return (
    <div>
      <h1>Manage Students</h1>

      {/* Upload PDF */}
      <div>
        <h3>Upload Resource (PDF)</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadPdf}>Upload PDF</button>
      </div>

      {/* Write Blog */}
      <div>
        <h3>Write Blog</h3>
        <textarea
          value={blogText}
          onChange={(e) => setBlogText(e.target.value)}
          placeholder="Write your blog here..."
        />
        <button onClick={handleUploadBlog}>Post Blog</button>
      </div>

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
        <label>
          Branch:
          <select onChange={(e) => setBranchFilter(e.target.value)}>
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            {/* Add more branches as needed */}
          </select>
        </label>

        <label>
          Year:
          <select onChange={(e) => setYearFilter(e.target.value)}>
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </label>

        <h3>Student Data</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
