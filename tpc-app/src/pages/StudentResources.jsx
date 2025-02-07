import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./StudentResources.css";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const StudentResources = () => {
  const [latestBlog, setLatestBlog] = useState(null);
  const [activeTab, setActiveTab] = useState("test");

  useEffect(() => {
    const fetchLatestBlog = async () => {
      const q = query(collection(db, "Blog"), orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setLatestBlog(doc.data());
      });
    };
    fetchLatestBlog();
  }, []);

  return (
    <div className="student-resources">
      <h1>Student Resources</h1>
      {latestBlog ? (
        <div className="blog">
          <h2>{latestBlog.title}</h2>
          <p>{latestBlog.content}</p>
        </div>
      ) : (
        <p>Loading latest blog...</p>
      )}

      <div className="tabs">
        <button
          className={activeTab === "test" ? "active" : ""}
          onClick={() => setActiveTab("test")}
        >
          Test Your Knowledge
        </button>
        <button
          className={activeTab === "study" ? "active" : ""}
          onClick={() => setActiveTab("study")}
        >
          Study Material
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "test" ? (
          <p>Here you can find quizzes and challenges to test your knowledge.</p>
        ) : (
          <p>Here is a collection of study materials and resources.</p>
        )}
      </div>
    </div>
  );
};

export default StudentResources;
