import React, { useState, useEffect } from 'react';
import "firebase/compat/auth";
import firebase from 'firebase/compat/app';
import { saveAs } from 'file-saver'; // for Excel download
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageStudent.css'

const ManageStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');

  const navigate = useNavigate(); // For navigation
  const loggedInUser = firebase.auth().currentUser?.email;

  // Fetch users from the database on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = firebase.database().ref('users/Student');
      const snapshot = await usersRef.get();
      if (snapshot.exists()) {
        const usersData = snapshot.val();

        // Convert usersData object to an array
        const usersList = Object.keys(usersData).map(key => ({
          ...usersData[key],
          userId: key, // Add userId for referencing
        }));

        // Set both users and filteredUsers
        setUsers(usersList);
        setFilteredUsers(usersList);
      }
    };

    fetchUsers();
  }, []);

  // Filter users as searchName changes (live search)
  useEffect(() => {
    if (!searchName) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name && user.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchName, users]);

  // Handle creating a user without logging them in
  const handleCreateUser = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Create user in Firebase Authentication (without logging them in)
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Store user details in Firebase Database (DO NOT STORE PASSWORD)
      await firebase.database().ref(`users/Student/${userId}`).set({
        name,
        email,
        password,
        createdOn: new Date().toLocaleString(),
        createdBy: loggedInUser,
      });

      alert('User created successfully!');

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');

      await firebase.auth().signOut();
      navigate('/login');

    } catch (error) {
      console.error('Error creating user:', error);
      alert(error.message);
    }
  };

  // Handle exporting to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'StudentEmailPassword');
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelFile]), 'users.xlsx');
  };

  return (
    <div className="manage-student-container">
      <h2 className="header">Manage Users</h2>
      <div className="form-container">
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-button" onClick={handleCreateUser}>Create User</button>
      </div>

      <div className="search-container">
        <input
          className="search-field"
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Created On</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password || 'N/A'}</td>
                <td>{user.createdOn}</td>
                <td>{user.createdBy}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='downloadbutton'>
      <button className="export-button" onClick={exportToExcel}>Download Excel</button>
    </div>
    </div >
  );
};

export default ManageStudent;
