import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import '../styles/ManageStudent.css';

const Announcements = () => {
    const [announcement, setAnnouncement] = useState("");

    const handleUploadAnnouncement = () => {
        const announcementId = new Date().getTime();
        firebase.database().ref(`announcements/${announcementId}`).set({
          announcementText: announcement,
          createdOn: new Date().toLocaleString(),
        });
        alert("Announcement Uploaded!");
        setAnnouncement("");
      };

    return(
      <div className="manage-box">
        <h3>Post Announcement</h3>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Write an announcement here..."
        />
        <button onClick={handleUploadAnnouncement}>Post Announcement</button>
      </div>
    );
};

export default Announcements;