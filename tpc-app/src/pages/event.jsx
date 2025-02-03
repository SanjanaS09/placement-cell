// import React from "react";
// import { motion } from "framer-motion";
// import "../styles/event.css";

// const eventsData = [
//   {
//     title: "Resume Building Workshop",
//     date: "January 10, 2024",
//     description: "A session on crafting the perfect resume for job applications.",
//     image: "resume_workshop.jpg",
//   },
//   {
//     title: "Mock Interviews",
//     date: "February 5, 2024",
//     description: "Simulated interview experience to prepare students for placements.",
//     image: "mock_interview.jpg",
//   },
//   {
//     title: "Technical Training Program",
//     date: "March 15, 2024",
//     description: "An intensive training on data structures and algorithms.",
//     image: "tech_training.jpg",
//   },
// ];

// const Events = () => {
//   return (
//     <div className="events-container">
//       <h2 className="events-heading">Events & Trainings</h2>
//       <motion.div 
//         className="events-gallery" 
//         initial={{ x: "100%" }} 
//         animate={{ x: "0%" }} 
//         transition={{ duration: 1 }}
//       >
//         {eventsData.map((event, index) => (
//           <div key={index} className="event-card">
//             <img src={event.image} alt={event.title} className="event-image" />
//             <h3 className="event-title">{event.title}</h3>
//             <p className="event-date">{event.date}</p>
//             <p className="event-description">{event.description}</p>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default Events;

import React from "react";
import { motion } from "framer-motion";
import "../styles/event.css";

const eventsData = [
  {
    title: "Resume Building Workshop",
    date: "January 10, 2024",
    description: "A session on crafting the perfect resume for job applications.",
    image: "C:\Users\Dell\Desktop\placement-cell\tpc-app\src\assets\images\Seminar.jpeg",
  },
  {
    title: "Mock Interviews",
    date: "February 5, 2024",
    description: "Simulated interview experience to prepare students for placements.",
    image: "C:\Users\Dell\Desktop\placement-cell\tpc-app\src\assets\images\Interview.jpeg",
  },
  {
    title: "Technical Training Program",
    date: "March 15, 2024",
    description: "An intensive training on data structures and algorithms.",
    image: "C:\Users\Dell\Desktop\placement-cell\tpc-app\src\assets\images\Training.jpeg",
  },
];

const scrollingImages = [
  "Seminar.jpeg",
  "Interview.jpeg",
  "Training.jpeg",
  "Seminar.jpeg",
  "Interview.jpeg",
  "Training.jpg"
];

const Events = () => {
  return (
    <div className="events-container">
      <h2 className="events-heading">Events & Trainings</h2>
      <div className="scrolling-section">
        <motion.div 
          className="scrolling-gallery"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{ display: "flex", width: "150%" }}
        >
          {[...scrollingImages, ...scrollingImages].map((image, index) => (
            <img key={index} src={image} alt="event" className="scrolling-image" />
          ))}
        </motion.div>
      </div>
      <div className="events-info">
        <h3>Why Attend Our Events?</h3>
        <p>Enhance your skills with hands-on workshops, expert talks, and training sessions.</p>
        <p>Get industry insights and improve your placement readiness.</p>
      </div>
    </div>
  );
};

export default Events;
