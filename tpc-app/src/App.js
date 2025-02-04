import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import Home from './pages/Home.jsx';
import ContactUs from './pages/Contactus.jsx';
import StudentPage from './pages/StudentPage.jsx';
import RecruiterPage from './pages/RecruiterPage.jsx';
import TPOHOME from './pages/TPOHOME.jsx';
import Blog from './pages/Blog.jsx'
import Announcements from './pages/Announcements.jsx'
import ManageStudent from './pages/ManageStudent.jsx';
import ManageRecruiter from './pages/ManageRecruiter.jsx'
import PageNotFound from './pages/PageNotFound.jsx';

import Login from './pages/LoginPage.jsx';
import Signup from './pages/Signup.jsx';
import Events from './pages/event.jsx';

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
        const userRef = await firebase.database().ref(`users`).once('value');
        const usersData = userRef.val();
        let userRole = null;

        // Check which role the user falls under
        if (usersData.Student[userId] && usersData.Student[userId].role==='Student') {
          userRole = 'Student';
        } else if (usersData.Recruiter[userId] && usersData.Recruiter[userId].role==='Recruiter') {
          userRole = 'Recruiter';
        } else if (usersData.Coordinator[userId] && usersData.Coordinator[userId].role==='Coordinator') {
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
  }, [loggedInUser]);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contactus" element={<ContactUs />} />
        <Route path="/Login" element={<Login setLoggedInUser={setLoggedInUser} setRole={setRole} role={role} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Events" element={<Events />} />

        {/* Role-based routes */}
        <Route
          path="/StudentPage"
          element={
            loggedInUser ? (
              <StudentPage role={role} />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/RecruiterPage"
          element={
            loggedInUser ? (
              <RecruiterPage role={role} />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        <Route path="/TPOPage" element={<TPOHOME role={role}/>}>
          {/* <Route path="/TPOPage" element={<TPOHOME />} /> */}
          <Route path="ManageStudents" element={<ManageStudent role={role}/>} />
          <Route path="ManageRecruiter" element={<ManageRecruiter role={role}/>} />
          <Route path="Blog" element={<Blog role={role}/>} />
          <Route path="Announcements" element={<Announcements role={role}/>} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router >
  );
};

export default App;
