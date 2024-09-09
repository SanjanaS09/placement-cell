import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import TPOPage from './pages/TPOPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contactus" element={<ContactUs />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/StudentSignup" element={<StudentSignup />} />
        <Route path="/RecruiterLogin" element={<RecruiterLogin />} />
        <Route path="/RecruiterSignup" element={<RecruiterSignup />} />
        <Route path="/CoordinatorLogin" element={<TPOLogin />} />
        <Route path="/CoordinatorSignup" element={<TPOSignup />} />
        <Route path ="/StudentPage" element={<StudentPage />} />
        <Route path ="/RecruiterPage" element={<RecruiterPage />} />
        <Route path ="/TPOPage" element={<TPOPage />} />
      </Routes>
    </Router>
  );
}

export default App;