import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import logo from '../assets/images/sndt-logo.png';
import '../styles/StudentProfile.css'

function StudentPage() {
    const [studentData, setStudentData] = useState({
      name: "",
      branch: "",
      prn: "",
      year: "",
      skills: "",
      languages: "",
      certifications: "",
      technicalSkills: "",
      internshipDone: "No",
      duration: "",
      isPaid: "No",
      stipend: "",
      description: "",
      certificates: [],
      resume: null,
    });
  
    const handleChange = (event) => {
        const { name, value, files } = event.target;
    
        if (name === "certificates") {
          // Handling multiple files for certificates
          const newFiles = Array.from(files);
          setStudentData((prevData) => ({
            ...prevData,
            certificates: [...prevData.certificates, ...newFiles],
          }));
        } else {
          setStudentData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
          }));
        }
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Student Data:", studentData);
      alert("Form submitted successfully!");
    };
  
    return (
      <div className="student-page">
        <h1>Student Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Branch:</label>
            <select
              name="branch"
              value={studentData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              <option value="CST">CST</option>
              <option value="ENC">ENC</option>
              <option value="DS">DS</option>
              <option value="AI">AI</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="form-group">
            <label>PRN Number:</label>
            <input
              type="text"
              name="prn"
              value={studentData.prn}
              onChange={handleChange}
              placeholder="Enter your PRN number"
              required
            />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <select
              name="year"
              value={studentData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>
  
          <div className="form-group">
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              value={studentData.skills}
              onChange={handleChange}
              placeholder="Enter your skills"
            />
          </div>
          <div className="form-group">
            <label>Languages:</label>
            <input
              type="text"
              name="languages"
              value={studentData.languages}
              onChange={handleChange}
              placeholder="Enter known languages"
            />
          </div>
          <div className="form-group">
            <label>Certifications:</label>
            <input
              type="text"
              name="certifications"
              value={studentData.certifications}
              onChange={handleChange}
              placeholder="Enter certifications"
            />
          </div>
          <div className="form-group">
            <label>Technical Skills:</label>
            <input
              type="text"
              name="technicalSkills"
              value={studentData.technicalSkills}
              onChange={handleChange}
              placeholder="Enter technical skills"
            />
          </div>
  
          <div className="form-group">
            <label>Internship Done:</label>
            <select
              name="internshipDone"
              value={studentData.internshipDone}
              onChange={handleChange}
              required
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
  
          {studentData.internshipDone === "Yes" && (
            <>
              <div className="form-group">
                <label>Duration of Internship (in months):</label>
                <input
                  type="number"
                  name="duration"
                  value={studentData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration"
                  required
                />
              </div>
              <div className="form-group">
                <label>Was it Paid?</label>
                <select
                  name="isPaid"
                  value={studentData.isPaid}
                  onChange={handleChange}
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              {studentData.isPaid === "Yes" && (
                <div className="form-group">
                  <label>Stipend Offered:</label>
                  <input
                    type="number"
                    name="stipend"
                    value={studentData.stipend}
                    onChange={handleChange}
                    placeholder="Enter stipend amount"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Internship Description:</label>
                <textarea
                  name="description"
                  value={studentData.description}
                  onChange={handleChange}
                  placeholder="Describe the internship"
                  rows={4}
                  required
                />
              </div>
            </>
          )}
  
          <div className="form-group">
            <label>Upload Resume:</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="form-group">
          <label>Upload Certificates (Optional):</label>
          <input
            type="file"
            name="certificates"
            onChange={handleChange}
            accept=".pdf,.jpg,.png,.doc,.docx"
            multiple
          />
          {studentData.certificates.length > 0 && (
            <div>
              <h4>Uploaded Certificates:</h4>
              <ul>
                {studentData.certificates.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default StudentPage;
