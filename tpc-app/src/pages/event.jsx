import React from "react";
import { motion } from "framer-motion";
import "../styles/event.css";

// Import images correctly
import SeminarImg from "../assets/images/Seminar.jpeg";
import InterviewImg from "../assets/images/Interview.jpeg";
import TrainingImg from "../assets/images/Training.jpeg";

// Events Data with Proper Image Imports
const eventsData = [
  {
    title: "Resume Building Workshop",
    date: "January 10, 2024",
    description: "A session on crafting the perfect resume for job applications.",
    image: SeminarImg,
  },
  {
    title: "Mock Interviews",
    date: "February 5, 2024",
    description: "Simulated interview experience to prepare students for placements.",
    image: InterviewImg,
  },
  {
    title: "Technical Training Program",
    date: "March 15, 2024",
    description: "An intensive training on data structures and algorithms.",
    image: TrainingImg,
  },
];

// Use imported images for scrolling gallery
const scrollingImages = [
  SeminarImg,
  InterviewImg,
  TrainingImg,
  SeminarImg,
  InterviewImg,
  TrainingImg,
];

const Events = () => {
  return (
    <div className="events-page">
      <h2 className="events-heading">Events & Trainings</h2>

      {/* Scrolling Section */}
      <div className="scrolling-section">
        <motion.div
          className="scrolling-gallery"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {[...scrollingImages, ...scrollingImages].map((image, index) => (
            <motion.img 
              key={index} 
              src={image} 
              alt="event" 
              className="scrolling-image" 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              width={300}
            />
          ))}
        </motion.div>
      </div>

      {/* Events List */}
      <div className="events-list">
        {eventsData.map((event, index) => (
          <div key={index} className="event-card">
            {/* Applying hover effect on event images */}
            <motion.img
              src={event.image}
              alt={event.title}
              className="event-image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      {/* Event Info with Transition Effect */}
      <motion.div
        className="events-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h3>Why Attend Our Events?</h3>
        <p>Enhance your skills with hands-on workshops, expert talks, and training sessions.</p>
        <p>Get industry insights and improve your placement readiness.</p>
      </motion.div>
    </div>
  );
};

export default Events;
