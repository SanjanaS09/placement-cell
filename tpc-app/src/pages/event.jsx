import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/event.css";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [scrollingImages, setScrollingImages] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const eventsRef = ref(db, "Events");

    onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const eventsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Extract all event images for scrolling gallery
        const images = eventsArray
          .map((event) => event.image)
          .filter((img) => img); // Ensure only valid images are included

        setEventsData(eventsArray);
        setScrollingImages(images);
      } else {
        setEventsData([]);
        setScrollingImages([]);
      }
    });
  }, []);

  return (
    <div className="events-page">
      <h2 className="events-heading">Events & Trainings</h2>

      {/* Scrolling Section */}
      {scrollingImages.length > 0 && (
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
      )}

      {/* Events List */}
      <div className="events-list">
        {eventsData.map((event, index) => (
          <div key={index} className="event-card">
            <motion.img
              src={event.image}
              alt={event.name}
              className="event-image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3>{event.name}</h3>
            <p>{event.date} | {event.time} | {event.venue}</p>
            <p>{event.description}</p>
            <div className="speaker-info">
              {event.speakerImage && (
                <motion.img
                  src={event.speakerImage}
                  alt={event.speaker}
                  className="speaker-image"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <p><strong>Speaker:</strong> {event.speaker}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
