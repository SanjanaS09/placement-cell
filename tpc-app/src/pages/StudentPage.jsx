import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { motion } from "framer-motion";
import "../styles/StudentPage.css";

const StudentPage = ({ studentName }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsRef = firebase.database().ref("announcements");

        announcementsRef.on("value", (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const fetchedAnnouncements = Object.values(data)
              .map((item) => item.announcementText)
              .filter((text) => text.trim() !== "");
            setAnnouncements(fetchedAnnouncements);
          } else {
            setAnnouncements([]);
          }
        });

        return () => announcementsRef.off();
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventRef = firebase.database().ref("Events");

      eventRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const eventData = snapshot.val();
          const eventList = Object.keys(eventData).map((key) => ({
            id: key,
            ...eventData[key],
          }));
          setEvents(eventList);
        } else {
          setEvents([]);
        }
      });

      return () => eventRef.off();
    };

    fetchEvents();
  }, []);

  return (
    <div className="student-page">
      <h1 className="welcome">Welcome, {studentName}!</h1>

      {/* Announcements Section with Sliding Effect */}
      {announcements.length > 0 && (
        <div className="announcement-bar">
          <motion.div
            className="announcement-slider"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            {announcements.map((announcement, index) => (
              <span key={index} className="announcement-text">
                {announcement} •{" "}
              </span>
            ))}
          </motion.div>
        </div>
      )}

      {/* Events Section */}
      <motion.div className="events-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="section-title">Upcoming Events</h2>
        {events.length > 0 ? (
          <div className="events-container">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="event-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="event-title">{event.name}</h3>
                <p className="event-description"><strong>Description:</strong> {event.description}</p>
                <p className="event-info"><strong>Date:</strong> {event.date}</p>
                <p className="event-info"><strong>Time:</strong> {event.time}</p>
                <p className="event-info"><strong>Venue:</strong> {event.venue}</p>
                <p className="event-info"><strong>Speaker:</strong> {event.speaker}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="no-events">No upcoming events.</p>
        )}
      </motion.div>
    </div>
  );
};

export default StudentPage;
