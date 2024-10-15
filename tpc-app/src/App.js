import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import Home from './pages/Home.jsx';
import ContactUs from './pages/Contactus.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import StudentSignup from './pages/StudentSignup.jsx';
import StudentPage from './pages/StudentPage.jsx';
import RecruiterLogin from './pages/RecruiterLogin.jsx';
import RecruiterSignup from './pages/RecruiterSignup.jsx';
import RecruiterPage from './pages/RecruiterPage.jsx';
import TPOLogin from './pages/CoordinatorLogin.jsx';
import TPOSignup from './pages/CoordinatorSignup.jsx';
import TPOPage from './pages/TPOPage.jsx';
import ManageStudents from './pages/ManageStudent.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

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
        <Route path="/StudentLogin" element={<StudentLogin setLoggedInUser={setLoggedInUser} />} />
        <Route path="/StudentSignup" element={<StudentSignup />} />
        <Route path="/RecruiterLogin" element={<RecruiterLogin setLoggedInUser={setLoggedInUser} />} />
        <Route path="/RecruiterSignup" element={<RecruiterSignup />} />
        <Route path="/CoordinatorLogin" element={<TPOLogin setLoggedInUser={setLoggedInUser} />} />
        <Route path="/CoordinatorSignup" element={<TPOSignup />} />

        {/* Role-based routes */}
        <Route
          path="/StudentPage"
          element={
            loggedInUser && role === 'Student' ? (
              <StudentPage />
            ) : (
              <Navigate to={role === 'Recruiter' ? "/RecruiterPage" : "/StudentLogin"} />
            )
          }
        />
        <Route
          path="/RecruiterPage"
          element={
            loggedInUser && role === 'Recruiter' ? (
              <RecruiterPage />
            ) : (
              <Navigate to={role === 'Student' ? "/StudentPage" : "/RecruiterLogin"} />
            )
          }
        />
        <Route
          path="/TPOPage/"
          element={
            loggedInUser && role === 'Coordinator' ? (
              <TPOPage />
            ) : (
              <Navigate to="/CoordinatorLogin" />
            )
          }
        >
          <Route path="ManageStudent" element={<ManageStudents />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
