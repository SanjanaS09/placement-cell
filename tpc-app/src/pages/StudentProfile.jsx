import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import '../styles/StudentProfile.css';

const getAcademicYear = (graduationYear) => {
  const currentMonth = new Date().getMonth() + 1; // Month is zero-indexed
  const currentYear = new Date().getFullYear();

  if (graduationYear === currentYear + 1) return currentMonth >= 7 ? '4th' : '3rd';
  if (graduationYear === currentYear + 2) return currentMonth >= 7 ? '3rd' : '2nd';
  if (graduationYear === currentYear + 3) return currentMonth >= 7 ? '2nd' : '1st';
  if (graduationYear === currentYear + 4) return '1st';

  return '';
};

function StudentProfile({ loggedInUser }) {
  const [studentData, setStudentData] = useState({
    name: '',
    branch: '',
    prn: '',
    year: '',
    skills: '',
    languages: '',
    certifications: '',
    technicalSkills: '',
    address: '',
    cgpa: '',
    sgpa: Array(8).fill(''),
    course: 'B.Tech',
    dob: '',
    email: '',
    githubLink: '',
    linkedinLink: '',
    rollNo: '',
    sex: 'Female',
    phone: '',
    experiences: [],
    projects: [],
    // internshipDone: 'No',
    // duration: '',
    // isPaid: 'No',
    // stipend: '',
    description: '',
    certificates: [],
    resume: null,
    graduationYear: "",
  });

  useEffect(() => {
    const year = getAcademicYear(studentData.graduationYear);
    setStudentData((prevData) => ({ ...prevData, year }));
  }, [studentData.graduationYear]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'certificates') {
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

  const handleSgpaChange = (index, value) => {
    const updatedSgpa = [...studentData.sgpa];
    updatedSgpa[index] = value;
    setStudentData((prevData) => ({ ...prevData, sgpa: updatedSgpa }));
  };

  const addExperience = () => {
    setStudentData((prevData) => ({
      ...prevData,
      experiences: [...prevData.experiences, ''],
    }));
  };

  const addProject = () => {
    setStudentData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { title: '', description: '' }],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dbPath = `Students/${studentData.graduationYear}/${studentData.branch}/${loggedInUser}`;

    try {
      // Assuming firebase is already imported and initialized
      await firebase.database().ref(dbPath).set(studentData);
      console.log('Student Data:', studentData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error saving data to Firebase:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="student-page">
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={studentData.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Branch:</label>
          <select name="branch" value={studentData.branch} onChange={handleChange} required>
            <option value="">Select Branch</option>
            <option value="CST">CST (Computer Science Technology)</option>
            <option value="ENC">ENC (Electronics and Communication)</option>
            <option value="DS">DS (Data Science)</option>
            <option value="AI">AI (Artificial Intelligence)</option>
            <option value="CE">CE (Civil Engineering)</option>
            <option value="IT">IT (Information Technology)</option>
          </select>
        </div>

        <div className="form-group">
          <label>PRN Number:</label>
          <input type="text" name="prn" value={studentData.prn} onChange={handleChange} placeholder="Enter your PRN number" required />
        </div>

        <div className="form-group">
          <label>Graduation Year:</label>
          <input type="number" name="graduationYear" value={studentData.graduationYear} onChange={handleChange} min="2025" max="2028" />
        </div>

        <div className="form-group">
          <label>Year of Study:</label>
          <input type="text" value={studentData.year} readOnly />
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <input type="text" name="skills" value={studentData.skills} onChange={handleChange} placeholder="Enter your skills" />
        </div>

        <div className="form-group">
          <label>Languages:</label>
          <input type="text" name="languages" value={studentData.languages} onChange={handleChange} placeholder="Enter known languages" />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={studentData.address} onChange={handleChange} placeholder="Address" required />
        </div>

        <div className="form-group">
          <label>CGPA:</label>
          <input type="number" name="cgpa" value={studentData.cgpa} onChange={handleChange} placeholder="CGPA" required />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="text" name="dob" value={studentData.dob} onChange={handleChange} placeholder="Date of Birth" required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={studentData.email} onChange={handleChange} placeholder="Email" required />
        </div>

        <div className="form-group">
          <label>GitHub Link:</label>
          <input type="text" name="githubLink" value={studentData.githubLink} onChange={handleChange} placeholder="GitHub Link" />
        </div>

        <div className="form-group">
          <label>LinkedIn Link:</label>
          <input type="text" name="linkedinLink" value={studentData.linkedinLink} onChange={handleChange} placeholder="LinkedIn Link" />
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input type="text" name="rollNo" value={studentData.rollNo} onChange={handleChange} placeholder="Roll Number" required />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={studentData.phone} onChange={handleChange} placeholder="Phone Number" required />
        </div>

        <div className='SGPA'>
          {studentData.sgpa.map((sgpa, index) => (
            <div className="form-group" key={index}>
              <label>SGPA {index + 1}:</label>
              <input
                type="number"
                value={sgpa}
                onChange={(e) => handleSgpaChange(index, e.target.value)}
                placeholder={`SGPA ${index + 1}`}
                min="0"
                max="10"
              />
            </div>
          ))}
        </div>

        <button type="button" onClick={addExperience}>Add Experience</button>
        {studentData.experiences.map((exp, index) => (
          <div className="form-group" key={index}>
            <label>Experience:</label>
            <input type="text" value={exp} onChange={(e) => handleChange(e)} placeholder="Experience" />
          </div>
        ))}

        <button type="button" onClick={addProject}>Add Project</button>
        {studentData.projects.map((project, index) => (
          <div className="form-group" key={index}>
            <label>Project {index + 1}:</label>
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => {
                const updatedProjects = [...studentData.projects];
                updatedProjects[index].title = e.target.value;
                setStudentData({ ...studentData, projects: updatedProjects });
              }}
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => {
                const updatedProjects = [...studentData.projects];
                updatedProjects[index].description = e.target.value;
                setStudentData({ ...studentData, projects: updatedProjects });
              }}
            />
          </div>
        ))}

        <div className="form-group">
          <label>Certifications:</label>
          <input type="text" name="certifications" value={studentData.certifications} onChange={handleChange} placeholder="Enter certifications" />
        </div>

        <div className="form-group">
          <label>Technical Skills:</label>
          <input type="text" name="technicalSkills" value={studentData.technicalSkills} onChange={handleChange} placeholder="Enter technical skills" />
        </div>

        <div className="form-group">
          <label>Upload Resume:</label>
          <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" />
        </div>

        <div className="form-group">
          <label>Upload Certificates (Optional):</label>
          <input type="file" name="certificates" onChange={handleChange} accept=".pdf,.jpg,.png,.doc,.docx" multiple />
          {studentData.certificates.length > 0 && (
            <ul>
              {studentData.certificates.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfile;
