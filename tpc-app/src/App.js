import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import Home from './pages/Home.jsx';
import ContactUs from './pages/Contactus.jsx';
import StudentPage from './pages/StudentPage.jsx';
import RecruiterPage from './pages/RecruiterPage.jsx';
import TPOPage from './pages/TPOPage.jsx';
import Blog from './pages/Blog.jsx'
import Announcements from './pages/Announcements.jsx'
import ManageStudent from './pages/ManageStudent.jsx';
import ManageRecruiter from './pages/ManageRecruiter.jsx'
import PageNotFound from './pages/PageNotFound.jsx';

import Login from './pages/LoginPage.jsx';
import Signup from './pages/Signup.jsx';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user ID
  const [role, setRole] = useState(null); // Store role of logged-in user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        setLoggedInUser(userId);

        // Fetch the role from Firebase Database
        const userRef = firebase.database().ref(`users/`);
        const snapshot = await userRef.once('value');

        const usersData = snapshot.val();
        let userRole = null;

        // Check which role the user falls under
        if (usersData.Student && usersData.Student[userId]) {
          userRole = 'Student';
        } else if (usersData.Recruiter && usersData.Recruiter[userId]) {
          userRole = 'Recruiter';
        } else if (usersData.Coordinator && usersData.Coordinator[userId]) {
          userRole = 'Coordinator';
        }

        setRole(userRole); // Set the role for conditional access
        setLoading(false);
      } else {
        setLoggedInUser(null);
        setRole(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contactus" element={<ContactUs />} />
        <Route path="/Login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Role-based routes */}
        <Route
          path="/StudentPage"
          element={
            loggedInUser ? (
              <StudentPage />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/RecruiterPage"
          element={
            loggedInUser ? (
              <RecruiterPage />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
          <Route path='/TPOPage/' element={<TPOPage/>}>
          <Route path="Home" element={<h1>Welcome to the TPO Dashboard</h1>} />
          <Route path="ManageStudent" element={<ManageStudent />} />
          <Route path="ManageRecruiter" element={<ManageRecruiter />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="Announcements" element={<Announcements />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router >
  );
};

export default App;
