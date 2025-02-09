// // 
// // Import necessary dependencies
// import React, { useEffect, useState } from "react";
// import { db } from "../firebaseConfig.js"; // Ensure correct Firebase import
// import { collection, getDocs } from "firebase/firestore";
// import { motion } from "framer-motion"; // Import animations
// import '../styles/StudentPage.css'



// const StudentPage = ({ studentName }) => {
//   // Dummy Announcements (Moving Text)
//   const [announcements, setAnnouncements] = useState([
//     "📢 Campus Placements begin from Oct 25, 2024!",
//     "🔔 Resume submission deadline: Oct 20, 2024.",
//     "💡 AI/ML Workshop by Google on Nov 5, 2024. Register now!",
//   ]);

//   // Dummy Events List
//   const [events, setEvents] = useState([
//     {
//       name: "AI & Machine Learning Workshop",
//       description: "A workshop on AI trends and ML applications.",
//       date: "Nov 5, 2024",
//       time: "10:00 AM - 4:00 PM",
//       venue: "Auditorium Hall, Block A",
//       speaker: "Dr. John Smith (Google AI)",
//     },
//     {
//       name: "Resume Building & Interview Prep",
//       description: "Learn to build ATS-friendly resumes and crack interviews.",
//       date: "Oct 18, 2024",
//       time: "2:00 PM - 5:00 PM",
//       venue: "Room 301, T&P Cell",
//       speaker: "Ms. Ananya Rao (LinkedIn India)",
//     },
//   ]);

//   return (
//     <div className="student-page">
//       {/* Moving Announcement Bar */}
//       <div className="announcement-bar">
//         <marquee>{announcements.join(" | ")}</marquee>
//       </div>

//       {/* Welcome Message */}
//       <h1 className="welcome">Welcome, {studentName}!</h1>

//       {/* Tabs Section */}
//       <div className="tabs-container">
//         {["Student Profile", "Resources"].map((tab, index) => (
//           <motion.button
//             key={index}
//             className="tab"
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.92 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
           
//             {tab}
//           </motion.button>
//         ))}
//       </div>

//       {/* Upcoming Events Section */}
//       <div className="events-section">
//         <h2>Upcoming Events</h2>
//         <div className="events-container">
//           {events.length > 0 ? (
//             events.map((event, index) => (
//               <motion.div
//                 key={index}
//                 className="event-card"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//               >
//                 <h3>{event.name}</h3>
//                 <p><strong>Description:</strong> {event.description}</p>
//                 <p><strong>Date:</strong> {event.date}</p>
//                 <p><strong>Time:</strong> {event.time}</p>
//                 <p><strong>Venue:</strong> {event.venue}</p>
//                 <p><strong>Speaker:</strong> {event.speaker}</p>
//               </motion.div>
//             ))
//           ) : (
//             <p className="no-events">No upcoming events</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentPage;

// import React, { useEffect, useState } from "react";
// import { db } from "../firebaseConfig.js"; // Ensure correct Firebase import
// import { collection, getDocs } from "firebase/firestore";
// import { motion } from "framer-motion"; // Import animations
// import '../styles/StudentPage.css';

// const StudentPage = ({ studentName }) => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [events, setEvents] = useState([
//     {
//       name: "AI & Machine Learning Workshop",
//       description: "A workshop on AI trends and ML applications.",
//       date: "Nov 5, 2024",
//       time: "10:00 AM - 4:00 PM",
//       venue: "Auditorium Hall, Block A",
//       speaker: "Dr. John Smith (Google AI)",
//     },
//     {
//       name: "Resume Building & Interview Prep",
//       description: "Learn to build ATS-friendly resumes and crack interviews.",
//       date: "Oct 18, 2024",
//       time: "2:00 PM - 5:00 PM",
//       venue: "Room 301, T&P Cell",
//       speaker: "Ms. Ananya Rao (LinkedIn India)",
//     },
//   ]);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Blog"));
//         const fetchedAnnouncements = querySnapshot.docs.map((doc) => doc.data().title);
//         setAnnouncements(fetchedAnnouncements);
//       } catch (error) {
//         console.error("Error fetching announcements: ", error);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   return (
//     <div className="student-page">
//       {/* Moving Announcement Bar */}
//       <div className="announcement-bar">
//         <marquee>{announcements.length > 0 ? announcements.join(" | ") : "No announcements available"}</marquee>
//       </div>

//       {/* Welcome Message */}
//       <h1 className="welcome">Welcome, {studentName}!</h1>

//       {/* Tabs Section */}
//       <div className="tabs-container">
//         {["Student Profile", "Resources"].map((tab, index) => (
//           <motion.button
//             key={index}
//             className="tab"
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.92 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             {tab}
//           </motion.button>
//         ))}
//       </div>

//       {/* Upcoming Events Section */}
//       <div className="events-section">
//         <h2>Upcoming Events</h2>
//         <div className="events-container">
//           {events.length > 0 ? (
//             events.map((event, index) => (
//               <motion.div
//                 key={index}
//                 className="event-card"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//               >
//                 <h3>{event.name}</h3>
//                 <p><strong>Description:</strong> {event.description}</p>
//                 <p><strong>Date:</strong> {event.date}</p>
//                 <p><strong>Time:</strong> {event.time}</p>
//                 <p><strong>Venue:</strong> {event.venue}</p>
//                 <p><strong>Speaker:</strong> {event.speaker}</p>
//               </motion.div>
//             ))
//           ) : (
//             <p className="no-events">No upcoming events</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentPage;

import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import '../styles/StudentPage.css';

const StudentPage = ({ studentName }) => {
  const [announcements, setAnnouncements] = useState([]);
  
  const [events, setEvents] = useState([
    {
      name: "AI & Machine Learning Workshop",
      description: "A workshop on AI trends and ML applications.",
      date: "Nov 5, 2024",
      time: "10:00 AM - 4:00 PM",
      venue: "Auditorium Hall, Block A",
      speaker: "Dr. John Smith (Google AI)",
    },
    {
      name: "Resume Building & Interview Prep",
      description: "Learn to build ATS-friendly resumes and crack interviews.",
      date: "Oct 18, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "Room 301, T&P Cell",
      speaker: "Ms. Ananya Rao (LinkedIn India)",
    },
  ]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Blog"));
        const fetchedAnnouncements = querySnapshot.docs.map((doc) => doc.data().title);
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="student-page">
      {/* Moving Announcement Bar */}
      <div className="announcement-bar">
        <marquee>{announcements.length > 0 ? announcements.join(" | ") : "No announcements available"}</marquee>
      </div>

      {/* Welcome Message */}
      <h1 className="welcome">Welcome, {studentName}!</h1>

      {/* Tabs Section */}
      <div className="tabs-container">
        <motion.a
          href="/StudentProfile"
          className="tab"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Student Profile
        </motion.a>
        <motion.a
          href="/StudentResources"
          className="tab"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Resources
        </motion.a>
      </div>

      {/* Upcoming Events Section */}
      <div className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-container">
          {events.length > 0 ? (
            events.map((event, index) => (
              <motion.div
                key={index}
                className="event-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3>{event.name}</h3>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Speaker:</strong> {event.speaker}</p>
              </motion.div>
            ))
          ) : (
            <p className="no-events">No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
