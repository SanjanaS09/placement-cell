import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import ContactUs from './pages/contactus.js';
import StudentLogin from './pages/sudent-login.js';
import StudentSignup from './pages/student-signup.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
      </Routes>
    </Router>
  );
}

export default App;